import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Markdown({ content }) {
  return (
    <div className="prose prose-invert max-w-none leading-relaxed">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 🔥 HEADINGS
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-4 mb-2 text-blue-400">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-4 mb-2 text-blue-300">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-3 mb-1 text-blue-200">
              {children}
            </h3>
          ),

          // 🔥 PARAGRAPH
          p: ({ children }) => (
            <p className="mb-2 text-gray-200 leading-relaxed">{children}</p>
          ),

          // 🔥 UNORDERED LIST
          ul: ({ children }) => (
            <ul className="list-disc ml-5 space-y-1 text-gray-200">
              {children}
            </ul>
          ),

          // 🔥 ORDERED LIST
          ol: ({ children }) => (
            <ol className="list-decimal ml-5 space-y-2 text-gray-200">
              {children}
            </ol>
          ),

          // 🔥 LIST ITEM
          li: ({ children }) => <li>{children}</li>,

          // 🔥 BOLD
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),

          // 🔥 INLINE CODE
          code({ inline, className, children, ...props }) {
            if (inline) {
              return (
                <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-yellow-300">
                  {children}
                </code>
              );
            }

            return (
              <pre className="bg-black/40 p-4 rounded-xl overflow-x-auto my-3">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },

          // 🔥 BLOCKQUOTE
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-400 pl-3 italic text-gray-300 my-2">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
