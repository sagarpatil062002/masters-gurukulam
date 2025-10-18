"use client"

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded"></div>
})

import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['link'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean']
  ],
}

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent', 'link', 'color', 'background', 'align'
]

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editor = useMemo(() => (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules}
      formats={formats}
      className={className}
    />
  ), [value, onChange, placeholder, className])

  return (
    <div className="rich-text-editor">
      {editor}
      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-bottom: none;
          border-radius: 4px 4px 0 0;
        }
        .rich-text-editor .ql-container {
          border: 1px solid #ccc;
          border-radius: 0 0 4px 4px;
          min-height: 120px;
        }
        .rich-text-editor .ql-editor {
          min-height: 120px;
        }
      `}</style>
    </div>
  )
}