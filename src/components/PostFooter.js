import React from "react"
import { Link } from 'gatsby'

export default ({ frontmatter: { author, category, tags }, fields: { date } }) => {
  console.log(author);
  return (
    <>
      <p className="text-center">
        <Link to={`/people/${author.id}`}>{author.name}</Link>
        &nbsp;-&nbsp;
        {date}
      </p>
    </>
  )
}
