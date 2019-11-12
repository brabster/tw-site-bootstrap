import React from "react"

export default ({ frontmatter: { author, category, tags }, fields: { date } }) => {
  return (
    <>
      <p className="text-center">{author.name} - {date}</p>
    </>
  )
}
