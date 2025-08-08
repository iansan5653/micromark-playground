import {Button, Heading, Text} from "@primer/react";
import styles from "./App.module.css";

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

      <div className={styles.outputBox}>
        {submittedText || (
          <Text className={styles.emptyState}>No content submitted yet.</Text>
        )}
      </div>
    </div>
  );
}

export default OutputScreen;
