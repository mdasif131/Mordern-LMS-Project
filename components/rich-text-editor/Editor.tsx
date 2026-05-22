"use client"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Menubar from "./Menubar"
const RichTextEditor = ({ field }: { field: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "min-h-[300px] focus:outline-none p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert w-ful! max-w-none!",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()))
    },
    content: (() => {
      if (!field.value) return "<p>Hello World...</p>"

      try {
        return JSON.parse(field.value)
      } catch {
        return field.value
      }
    })(),
    immediatelyRender: false,
  })
  return (
    <div className="w-full overflow-hidden rounded-lg border border-input dark:bg-input/30 mt-1">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor
