---
title: First Impressions - GKE Private Cluster
date: 2019-11-08T00:00:00Z
layout: post
draft: true
path: /posts/gke-private-cluster
category: Google Cloud Platform
tags:
 - gcp
 - gke
 - kubernetes
 - k8s
 - docker
 - argo
author: brabster
---

I've been building out a workflow system for a client.
To keep things simple and re-use lots of existing Kubernetes experience in the team,
we picked the Kubernetes-native [Argo](https://github.com/argoproj/argo)
over more traditional choices like [Airflow](https://airflow.apache.org/). More on the workflow side of things in a future post.

The choice of Argo involves building out a dedicated Kubernetes cluster to run it. GKE is the simplest hosted option for this client, so that's an easy choice. I set about [Terraforming](https://www.terraform.io/) a shiny new cluster, but by default my cluster nodes get public IP addresses. They also, by default, have unfettered outbound internet access, plus RDP and SSH access. That bothered me, and was rightly picked up straight away when we started our security review.

I don't anticipate any need for these nodes to have internet access. They need to talk to other GCP services like BigQuery and Cloud Storage. They don't need to get to arbitrary websites. The architecture in my fevered dreams is a little GKE cluster running our workflow code, surrounded by an impenetrable wall of Google-managed serverless services. But how?

## Good ol' Firewall Rules

Yep, we could just set up firewall rules. As we're Terraforming anyway, that's not a big deal to configure. We do need to figure out what rules we need and the nodes still end up with internet-facing IP addresses. If we make a mistake we can quietly leave someone open that shouldn't be. Really, I'd like to avoid having the nodes on the internet at all. That just seems so much simpler, if it's possible.

## GKE Private Clusters

GKE supports [private clusters](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters), in which the nodes aren't on the internet at all. You can still talk to the master from the internet if you want, but the nodes are neatly locked away. Configuring all this is supported by the Terraform [google_container_cluster](https://www.terraform.io/docs/providers/google/r/container_cluster.html#private_cluster_config) resource type.

You'll need to tweak your config along the lines of:

```hcl
private_cluster_config {
  enable_private_nodes = true
  master_ipv4_cidr_block = "10.x.y.z/28"
}
```

That `master_ipv4_cidr_block` is mentioned in the [private cluster docs](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters). I think it just needs to not overlap with your existing subnets, and be a `/28` mask. Nodes can have access to other Google APIs, but that needs to be specified in the [google_compute_subnetwork property](https://www.terraform.io/docs/providers/google/d/datasource_compute_subnetwork.html#private_ip_google_access) for your node subnet(s).

So far so good. I adjust my configuration, destroy my old cluster and spin up my new one. Amazing - the cluster comes up, my `kubectl` can talk to it and everything looks fine! I try to deploy a workload, and...

Nope. Failed deployment, image pull error. Of course - the nodes can't get out to the internet to pull the images I'm using, like the `argoproj` images I need to deploy Argo! Before we figure that problem out, let's take a step back. How did the cluster find the other container images it needed to run in the first place?

## Mirror Images

It turns out that [Google Container Registry can act as a mirror](https://cloud.google.com/container-registry/docs/using-dockerhub-mirroring) for some Docker Hub images, and that this mirror is configured as part of a vanille GKE cluster. So *that's* how GKE was able to find the images it needed. I tried a deployment using `alpine` and that pulled fine. `elasticsearch` - not so much. It seems there is a fairly arbitrary set of repositories being mirrored and although `argoproj/argoexec` is one, the other images are not. As per the docs, you can see the mirrored repos with:

```bash
gcloud container images list --repository=mirror.gcr.io
```
and
```bash
gcloud container images list --repository=mirror.gcr.io/[REPO]
```

The mirror is very convenient, primarily because no changes are needed to pull images through the mirror instead of direct from the public Docker repository. Unfortunately, the GCR mirror doesn't mirror arbitrary repositories and images.

## Cloud Router and NAT

[GKE documentation](https://cloud.google.com/nat/docs/gke-example) takes you through setting up Cloud Router and NAT to route traffic out from your cluster nodes to the internet. As we're back in the realm of unfettered outbound access or firewall rules, I've looked at an alternative.

## Mirror-Ish

As we only need internet access for pulling public images, why not publish the images we need to our own GCR repository and pull from there? This approach works. The advantages of this approach boil down to image management. We can introduce controls over what images are available to our cluster, and we can enable vulnerability scanning on the images we publish - our security reviewers should love it.

The main downside is that the images we need are no longer in their standard repositories. We must updates images to point to the repositories in our `gcr.io` registry. So long as the workflow users have access to the GCR registry, that might not be a big problem - images will work the same way on their machines as they do in the cluster.










