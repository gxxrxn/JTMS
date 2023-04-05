import styled from "@emotion/styled";
import FluxProvider, { FluxContextProps } from "./FluxProvider";
import { PropsWithChildren, useMemo, CSSProperties } from "react";

const AlignCssValue = {
  top: "flex-start",
  middle: "center",
  bottom: "flex-end",
} as const;

interface StyledRowProps {
  justify: CSSProperties["justifyContent"];
  align: keyof typeof AlignCssValue;
  style: CSSProperties;
}

const StyledRow = styled.div<StyledRowProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;

  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => AlignCssValue[align]};
`;

type RowProps = StyledRowProps & FluxContextProps;

const Row = ({ children, justify, align, gutter, ...props }: PropsWithChildren<RowProps>) => {
  const gutterStyle = useMemo(() => {
    if (Array.isArray(gutter)) {
      const horizentalGutter = gutter[0];
      const verticalGutter = gutter[1];
      return {
        marginTop: `-${horizentalGutter / 2}px`,
        marginBottom: `-${horizentalGutter / 2}px`,
        marginLeft: `-${verticalGutter / 2}px`,
        marginRight: `-${verticalGutter / 2}px`,
      };
    } else {
      return {
        marginLeft: `-${gutter / 2}px`,
        marginRight: `-${gutter / 2}px`,
      };
    }
  }, [gutter]);

  return (
    <FluxProvider gutter={gutter}>
      <StyledRow
        {...props}
        align={align}
        justify={justify}
        style={{ ...props.style, ...gutterStyle }}
      >
        {children}
      </StyledRow>
    </FluxProvider>
  );
};

export default Row;
