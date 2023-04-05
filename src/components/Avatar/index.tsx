import ImageComponent, { ImageProps } from "../Image";
import styled from "@emotion/styled";
import { useState, useEffect, CSSProperties } from "react";
import AvatarGroup from "./AvatarGroup";

const ShapeToCssValue = {
  circle: "50%",
  round: "4px",
  square: "0px",
} as const;

interface AvatarWrapperProps {
  shape: keyof typeof ShapeToCssValue;
}

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  background-color: #eee;
  overflow: hidden;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

interface AvartarProps extends AvatarWrapperProps, ImageProps {
  size?: CSSProperties["width"] | CSSProperties["height"];
  __TYPE?: "Avatar";
}

const Avatar = ({
  lazy,
  threshold,
  src,
  size = 70,
  shape = "circle", // round, sqare 등이 있음
  placeholder,
  alt,
  __TYPE,
  mode = "cover",
  ...props
}: AvartarProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  });

  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
};

Avatar.defaultProps = {
  __TYPE: "Avatar",
};

// Avatar.propTypes = {
//   __TYPE: "Avatar",
// };

Avatar.Group = AvatarGroup;

export default Avatar;
