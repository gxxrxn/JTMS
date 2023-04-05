import { useState, useRef, useEffect, ImgHTMLAttributes, CSSProperties } from "react";

let observer = null;
const LOAD_IMG_EVENT_TYPE = "loadImge";

const onIntersection: IntersectionObserverCallback = (entires, io) => {
  entires.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

type AllowedAttributeKeys = "src" | "alt" | "placeholder" | "width" | "height" | "style";

export interface ImageProps
  extends Required<Pick<ImgHTMLAttributes<HTMLImageElement>, AllowedAttributeKeys>> {
  lazy: boolean;
  threshold: number;
  mode: CSSProperties["objectFit"];
  block?: boolean;
}

const Image = ({
  lazy,
  threshold = 0.5,
  placeholder,
  src,
  block,
  width,
  height,
  alt,
  mode,
  ...props
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const imageStyle = {
    display: block ? "block" : undefined,
    width,
    height,
    objectFit: mode, // cover, fill, contain
  };

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;
    imgElement && imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);

    return () => {
      imgElement && imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) return;
    observer = new IntersectionObserver(onIntersection, { threshold });
    imgRef.current && observer.observe(imgRef.current);
  }, [lazy, threshold]);

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt={alt}
      style={{ ...props.style, ...imageStyle }}
    />
  );
};

export default Image;
