import styled from "@emotion/styled";
import { CSSProperties, PropsWithChildren } from "react";

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 20px;
  color: white;
  background-color: #f44;
  transform: translate(50%, -50%);

  &.dot {
    padding: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;

interface BadgeProps {
  count: number;
  maxCount: number;
  showZero: boolean;
  dot: boolean;
  backgroundColor: CSSProperties["backgroundColor"];
  textColor: CSSProperties["color"];
}

const Badge = ({
  children,
  count,
  maxCount,
  showZero,
  dot = false,
  backgroundColor,
  textColor,
  ...props
}: PropsWithChildren<BadgeProps>) => {
  const colorStyle = {
    backgroundColor,
    color: textColor,
  };

  let badge = null;

  if (count) {
    badge = (
      <Super style={colorStyle}>{maxCount && count > maxCount ? `${maxCount}+` : count}</Super>
    );
  } else {
    if (count !== undefined) {
      badge = showZero ? <Super style={colorStyle}>0</Super> : null;
    } else if (dot) {
      badge = <Super className="dot" style={colorStyle}></Super>;
    }
  }

  return (
    <BadgeContainer {...props}>
      {children}
      {badge}
    </BadgeContainer>
  );
};

export default Badge;