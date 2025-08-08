import {useState} from "react";
import InputScreen from "./InputScreen";
import OutputScreen from "./OutputScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState<"input" | "display">(
    "input"
  );
  const [markdownInput, setMarkdownInput] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const handleSubmit = () => {
    setSubmittedText(markdownInput);
    setCurrentScreen("display");
  };

  const handleBack = () => {
    setCurrentScreen("input");
  };

  const handleInputChange = (value: string) => {
    setMarkdownInput(value);
  };

  if (currentScreen === "input") {
    return (
      <InputScreen
        markdownInput={markdownInput}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    );
  }

  return <OutputScreen submittedText={submittedText} onBack={handleBack} />;
}

export default App;
