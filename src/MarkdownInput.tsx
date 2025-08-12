import {useEffect, useRef} from "react";
import type {MarkdownToken} from "./TokenTree";
import styles from "./MarkdownInput.module.css";

interface MarkdownInputProps {
  markdown: string;
  onChange: (markdown: string) => void;
  selectedToken: MarkdownToken | null;
}

function MarkdownInput({
  markdown,
  selectedToken,
  onChange,
}: MarkdownInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedToken && containerRef.current) {
      const {start, end} = selectedToken;
      const textNode = containerRef.current.firstChild as Text;

      const range = new Range();
      range.setStart(textNode, start);
      range.setEnd(textNode, end);

      const highlight = new Highlight(range);
      CSS.highlights.set("token-highlight", highlight);
    }

    return () => {
      CSS.highlights.delete("token-highlight");
    };
  }, [selectedToken, markdown]);

  return (
    <textarea
      className={styles.markdownInput}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter some Markdown"
    >
      {markdown}
    </textarea>
  );
}

export default MarkdownInput;
