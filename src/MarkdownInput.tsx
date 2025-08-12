import {useEffect, useRef, useState} from "react";
import type {MarkdownToken} from "./TokenTree";
import styles from "./MarkdownInput.module.css";

import {InputRange} from "dom-input-range";

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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [highlightRects, setHighlightRects] = useState<DOMRect[] | null>(null);

  useEffect(() => {
    if (selectedToken && inputRef.current) {
      const range = new InputRange(
        inputRef.current,
        selectedToken.start,
        selectedToken.end
      );
      setHighlightRects(Array.from(range.getClientRects()));
    } else {
      setHighlightRects(null);
    }
  }, [selectedToken]);

  const containerRect = containerRef.current?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
  };

  return (
    <div ref={containerRef} style={{position: "relative"}}>
      <textarea
        className={styles.markdownInput}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter some Markdown"
        value={markdown}
        ref={inputRef}
      />
      {highlightRects?.map((rect, i) => (
        <div
          key={i}
          className={styles.highlight}
          style={{
            top: rect.top - containerRect.top,
            left: rect.left - containerRect.left,
            width: rect.width,
            height: rect.height,
          }}
        />
      ))}
    </div>
  );
}

export default MarkdownInput;
