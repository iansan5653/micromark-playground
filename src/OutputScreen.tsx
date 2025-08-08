import {Button, Heading} from "@primer/react";
import styles from "./OutputScreen.module.css";
import TokenTree, {type MarkdownToken} from "./TokenTree";
import MarkdownText from "./MarkdownText";
import {useState} from "react";

interface OutputScreenProps {
  submittedText: string;
  onBack: () => void;
}

function OutputScreen({submittedText, onBack}: OutputScreenProps) {
  const [selectedToken, setSelectedToken] = useState<MarkdownToken | null>(
    null
  );

  return (
    <div className={styles.container}>
      <div className={styles.outputHeader}>
        <Button onClick={onBack}>← Back to Input</Button>
        <Heading as="h2">Output</Heading>
        <div className={styles.spacer} />
      </div>

      <div className={styles.splitLayout}>
        <div className={styles.leftColumn}>
          <div className={styles.columnHeader}>Markdown Input</div>
          <MarkdownText
            markdown={submittedText}
            selectedToken={selectedToken}
          />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.columnHeader}>Micromark Tokens</div>
          <TokenTree
            markdownText={submittedText}
            onSelectToken={setSelectedToken}
            onDeselectToken={() => setSelectedToken(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default OutputScreen;
