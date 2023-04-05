// 동적 태그 이용
import PropTypes from "prop-types";
import { CSSProperties, ReactNode, ElementType } from "react";

interface HeaderProps {
  level: number;
  strong?: boolean;
  underline?: boolean;
  color: CSSProperties["color"];
  style?: CSSProperties;
  children: ReactNode;
}

// type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Header = ({ children, level = 1, strong, underline, color, ...props }: HeaderProps) => {
  let Tag = `h${level}` as keyof JSX.IntrinsicElements;
  if (level < 1 || level > 6) {
    console.warn("Header only accept `1~6` as `lelel`");
    Tag = "h1";
  }

  const fontStyle = {
    fontWeight: strong ? "bold" : "normal",
    textDecoration: underline ? "underline" : undefined,
    color,
  };
  return (
    <Tag style={{ ...props.style, ...fontStyle }} {...props}>
      {children}
    </Tag>
  );
};

// Header.propTypes = {
//   children: PropTypes.node.isRequired,
//   level: PropTypes.number,
//   strong: PropTypes.bool,
//   underline: PropTypes.bool,
//   color: PropTypes.string,
// };

export default Header;
