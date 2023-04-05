import styled from "@emotion/styled";
import { CSSProperties } from "react";
import Base from "./Base";

interface CircleProps {
  size: CSSProperties["width"] | CSSProperties["height"];
}

const Circle = styled(Base)<CircleProps>`
  width: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
  height: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
  border-radius: 50%;
`;

export default Circle;
