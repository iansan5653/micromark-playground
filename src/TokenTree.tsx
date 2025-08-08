import {useMemo, type MouseEventHandler} from "react";
import {parse, postprocess, preprocess} from "micromark";
import {gfm} from "micromark-extension-gfm";
import styles from "./TokenTree.module.css";

const micromarkParse = parse({extensions: [gfm()]});

export interface MarkdownToken {
  name: string;
  start: number;
  end: number;
  depth: number;
  direction: "enter" | "exit";
}

interface TokenProps extends MarkdownToken {
  onMouseOver: MouseEventHandler<HTMLLIElement>;
  onMouseOut: MouseEventHandler<HTMLLIElement>;
}

function Token({
  name,
  start,
  end,
  depth,
  direction,
  onMouseOver,
  onMouseOut,
}: TokenProps) {
  return (
    <li
      className={direction === "enter" ? styles.tokenEnter : styles.tokenExit}
      style={{marginLeft: `${depth}em`}}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
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
  onSelectToken: (token: MarkdownToken) => void;
  onDeselectToken: () => void;
}

function TokenTree({
  markdownText,
  onDeselectToken,
  onSelectToken,
}: TokenTreeProps) {
  const tokens = useMemo(() => {
    if (!markdownText) return null;

    const events = postprocess(
      micromarkParse.document().write(preprocess()(markdownText, "utf-8", true))
    );

    let depth = 0;
    return events.map<MarkdownToken>(([direction, {type, start, end}]) => {
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
        <Token
          key={index}
          {...token}
          onMouseOver={() => onSelectToken(token)}
          onMouseOut={() => onDeselectToken()}
        />
      ))}
    </ul>
  );
}

export default TokenTree;
