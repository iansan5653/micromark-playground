import {useEffect, useRef} from "react";
import type {MarkdownToken} from "./TokenTree";
import styles from "./MarkdownText.module.css";

interface MarkdownTextProps {
  markdown: string;
  selectedToken: MarkdownToken | null;
}

function MarkdownText({markdown, selectedToken}: MarkdownTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedToken && containerRef.current) {
      const {start, end} = selectedToken;
      const textNode = containerRef.current.firstChild as Text;

      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        try {
          // Create a range for the selected token
          const range = new Range();
          range.setStart(textNode, start);
          range.setEnd(textNode, end);
          console.log(range);

          // Create a highlight and add it to the CSS highlights registry
          const highlight = new Highlight(range);
          CSS.highlights.set("token-highlight", highlight);
        } catch (error) {
          // Fallback if range creation fails (e.g., invalid indices)
          console.warn("Failed to create highlight range:", error);
        }
      }
    }

    return () => {
      CSS.highlights.delete("token-highlight");
    };
  }, [selectedToken, markdown]);

  if (!markdown) {
    return <span className={styles.emptyState}>No content submitted yet.</span>;
  }

  return (
    <div ref={containerRef} className={styles.markdownContainer}>
      {markdown}
    </div>
  );
}

export default MarkdownText;
