import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface BlogProps {
  content: string;
}

const Blog: FC<BlogProps> = ({ content }) => {
  return (
    <ReactMarkdown
      className="text-lg text-gray-400 font-euclid"
      components={{
        h1: ({ node, ...props }) => (
          <p className="mt-8 mb-2 text-4xl font-bold text-white" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <p className="mt-6 mb-2 text-2xl font-bold text-white" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <p className="text-xl font-bold text-white" {...props} />
        ),
        li: ({ node, ordered, ...props }) => (
          <li className="list-disc" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Blog;
