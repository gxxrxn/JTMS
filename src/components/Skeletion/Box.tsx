import styled from "@emotion/styled";
import { CSSProperties } from "react";
import Base from "./Base";

type BoxType = {
  width: CSSProperties["width"];
  height: CSSProperties["height"];
};

const Box = styled(Base)<BoxType>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === "number" ? `${height}px` : height)};
`;

export default Box;
