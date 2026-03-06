import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        {...props}
        className="group scroll-mt-24 text-4xl font-bold flex items-center gap-2"
      />
    ),
  };
}