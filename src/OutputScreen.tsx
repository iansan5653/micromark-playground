import {Button, Heading} from "@primer/react";
import styles from "./App.module.css";

import {parse, postprocess, preprocess} from "micromark";
import {gfm} from "micromark-extension-gfm";
import {useMemo} from "react";

const micromarkParse = parse({extensions: [gfm()]});

interface OutputScreenProps {
  submittedText: string;
  onBack: () => void;
}

function OutputScreen({submittedText, onBack}: OutputScreenProps) {
  const tokens = useMemo(() => {
    return postprocess(
      micromarkParse
        .document()
        .write(preprocess()(submittedText, "utf-8", true))
    )
      .map(
        ([direction, token]) =>
          `${direction === "enter" ? "> " : "< "}${token.type} (${
            token.start
          }-${token.end})`
      )
      .join("\n");
  }, [submittedText]);

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
          {submittedText ? (
            tokens
          ) : (
            <span className={styles.emptyState}>No tokens to display.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutputScreen;
