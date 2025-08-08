import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import {BaseStyles, ThemeProvider} from "@primer/react";

import "@primer/primitives/dist/css/functional/themes/dark.css";
import "@primer/css/dist/primer.css";
import styles from "./main.module.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <div className={styles.main}>
          <App />
        </div>
      </BaseStyles>
    </ThemeProvider>
  </StrictMode>
);
