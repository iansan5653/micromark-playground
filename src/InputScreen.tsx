import {Button, Textarea, Heading, Text} from "@primer/react";
import styles from "./App.module.css";

interface InputScreenProps {
  markdownInput: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
}

function InputScreen({
  markdownInput,
  onInputChange,
  onSubmit,
}: InputScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading as="h2" className={styles.title}>
          📝 Markdown Playground
        </Heading>
        <Text className={styles.description}>
          Enter your Markdown content below and click submit to see it
          displayed.
        </Text>
      </div>

      <div className={styles.textareaContainer}>
        <Textarea
          value={markdownInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Paste your Markdown content here..."
          rows={15}
          className={styles.textarea}
          resize="vertical"
        />
      </div>

      <Button
        variant="primary"
        size="large"
        onClick={onSubmit}
        disabled={!markdownInput.trim()}
      >
        Submit
      </Button>
    </div>
  );
}

export default InputScreen;
