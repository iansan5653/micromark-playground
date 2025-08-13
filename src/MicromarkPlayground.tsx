import {Heading} from "@primer/react";
import styles from "./MicromarkPlayground.module.css";
import TokenTree, {type MarkdownToken} from "./TokenTree";
import MarkdownText from "./MarkdownInput";
import {useCallback, useDeferredValue, useState} from "react";

function MicromarkPlayground() {
  const [markdown, setMarkdown] = useState("");
  const [selectedToken, setSelectedToken] = useState<MarkdownToken | null>(
    null
  );
  const deferredMarkdown = useDeferredValue(markdown);

  return (
    <div className={styles.container}>
      <div className={styles.outputHeader}>
        <Heading as="h2">Output</Heading>
        <div className={styles.spacer} />
      </div>

      <div className={styles.splitLayout}>
        <div className={styles.leftColumn}>
          <div className={styles.columnHeader}>Markdown Input</div>
          <MarkdownText
            markdown={markdown}
            onChange={setMarkdown}
            selectedToken={selectedToken}
          />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.columnHeader}>Micromark Tokens</div>
          <TokenTree
            markdown={deferredMarkdown}
            onSelectToken={setSelectedToken}
            onDeselectToken={useCallback(() => setSelectedToken(null), [])}
          />
        </div>
      </div>
    </div>
  );
}

export default MicromarkPlayground;
