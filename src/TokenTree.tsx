import {useMemo} from "react";
import {parse, postprocess, preprocess} from "micromark";
import {gfm} from "micromark-extension-gfm";
import styles from "./TokenTree.module.css";

const micromarkParse = parse({extensions: [gfm()]});

interface TokenProps {
  name: string;
  start: number;
  end: number;
  depth: number;
  direction: "enter" | "exit";
}

function Token({name, start, end, depth, direction}: TokenProps) {
  return (
    <li
      className={direction === "enter" ? styles.tokenEnter : styles.tokenExit}
      style={{marginLeft: `${depth}em`}}
    >
      <span className={styles.tokenDirection}>
        {direction === "enter" ? "→" : "←"}
      </span>{" "}
      <span className={styles.tokenName}>{name}</span>{" "}
      <span className={styles.tokenPosition}>
        ({start}-{end})
      </span>
    </li>
  );
}

interface TokenTreeProps {
  markdownText: string;
}

function TokenTree({markdownText}: TokenTreeProps) {
  const tokens = useMemo(() => {
    if (!markdownText) return null;

    const events = postprocess(
      micromarkParse.document().write(preprocess()(markdownText, "utf-8", true))
    );

    let depth = 0;
    return events.map<TokenProps>(([direction, {type, start, end}]) => {
      return {
        name: type,
        start: start.offset,
        end: end.offset,
        depth: direction === "enter" ? depth++ : --depth,
        direction,
      };
    });
  }, [markdownText]);

  if (!tokens?.length) {
    return <span className={styles.emptyState}>No tokens to display.</span>;
  }

  return (
    <ul className={styles.tokenTree}>
      {tokens.map((token, index) => (
        <Token key={index} {...token} />
      ))}
    </ul>
  );
}

export default TokenTree;
