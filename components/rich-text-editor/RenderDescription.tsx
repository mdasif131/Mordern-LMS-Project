"use client"
import { useMemo } from "react"
import { generateHTML } from "@tiptap/core"
import { type JSONContent } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import parse from 'html-react-parser'

interface RenderDescriptionProps {
  json: JSONContent
}
const RenderDescription = ({ json }: RenderDescriptionProps) => {
  const html = useMemo(
    () =>
      generateHTML(json, [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ]),
    [json]
  )

  return (
    <div className="prose max-w-none dark:prose-invert prose-li:marker:text-primary">
      {parse(html)}
    </div>
  )
}

export default RenderDescription
