import {Button, Heading} from "@primer/react";
import styles from "./OutputScreen.module.css";
import TokenTree from "./TokenTree";

interface OutputScreenProps {
  submittedText: string;
  onBack: () => void;
}

function OutputScreen({submittedText, onBack}: OutputScreenProps) {
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
          {submittedText || (
            <span className={styles.emptyState}>No content submitted yet.</span>
          )}
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.columnHeader}>Micromark Tokens</div>
          <TokenTree markdownText={submittedText} />
        </div>
      </div>
    </div>
  );
}

export default OutputScreen;
