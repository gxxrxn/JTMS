import React, { CSSProperties, PropsWithChildren, ReactElement } from "react";

interface Props {
  shape: string;
  size: number;
  style?: CSSProperties;
}

const AvatarGroup = ({
  children,
  shape = "circle",
  size = 70,
  ...props
}: PropsWithChildren<Props>) => {
  const avatars = React.Children.toArray(children)
    .filter((element): element is ReactElement<Props> => {
      if (React.isValidElement(element) && element.props.__TYPE === "Avatar") return true;
      return false;
    })
    .map((avatar, index, avatars) => {
      return React.cloneElement(avatar, {
        ...avatar.props,
        size,
        shape,
        style: {
          ...avatar.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - index,
        },
      });
    });
  return <div style={{ paddingLeft: size / 5 }}>{avatars}</div>;
};

export default AvatarGroup;
