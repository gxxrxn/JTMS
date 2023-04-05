import { CSSProperties, PropsWithChildren } from "react";
import "./style.css";

interface TextProps {
  block?: boolean;
  paragraph?: boolean;
  size?: number;
  strong?: boolean;
  underline?: boolean;
  color?: CSSProperties["color"];
  mark?: boolean;
  code?: boolean;
  delete?: boolean;
  style?: CSSProperties;
}

const Text = ({
  children,
  block,
  paragraph,
  size,
  strong,
  underline,
  color,
  mark,
  code,
  delete: del,
  ...props
}: PropsWithChildren<TextProps>) => {
  const Tag = block ? "div" : paragraph ? "p" : "span";
  const fontStyle = {
    fontWeight: strong ? "bold" : undefined,
    fontSize: typeof size === "number" ? size : undefined,
    textDecoration: underline ? "underline" : undefined,
    color,
  };

  if (mark) {
    children = <mark>{children}</mark>;
  }

  if (code) {
    children = <code>{children}</code>;
  }

  if (del) {
    children = <del>{children}</del>;
  }

  return (
    <Tag
      className={typeof size === "string" ? `Text--size-${size}` : undefined}
      style={{ ...props.style, ...fontStyle }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
