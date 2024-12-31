import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

export default function MarkdownRenderer({ children }) {
  return (
    <ReactMarkdown
    remarkPlugins={[remarkBreaks]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-4xl font-bold my-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-3xl font-semibold my-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-2xl font-medium my-2" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="text-base leading-7 my-2" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 my-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 my-2" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="my-1" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-500 hover:underline" {...props} />
        ),
        code: ({ node, ...props }) => (
          <code className="bg-gray-200 text-red-500 px-1 rounded" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};