import NextImage, { ImageProps as NextImageProps } from "next/image";
import React from "react";

export enum ImageType {
  FULL_IMAGE = "FULL_IMAGE",
  MEDIUM_IMAGE = "MEDIUM_IMAGE",
  NORMAL_IMAGE = "NORMAL_IMAGE",
}

type ImageProps = NextImageProps & {
  type: ImageType;
  center?: boolean;
};

const Image = ({ type, center, ...rest }: ImageProps) => {
  switch (type) {
    case ImageType.NORMAL_IMAGE:
      return (
        <NextImage
          {...rest}
          width="0"
          height="0"
          sizes="100vw"
          alt={rest.alt || "Image"}
          style={{
            height: "auto",
            width: "100%",
            ...(center
              ? { marginBottom: "50%", transform: "translateY(-25%)" }
              : {}),
          }}
          priority
          loading="eager"
        />
      );
    case ImageType.MEDIUM_IMAGE:
      return (
        <NextImage
          {...rest}
          width="0"
          height="0"
          sizes="100vw"
          alt={rest.alt || "Image"}
          style={{ height: "auto", width: "calc((100vw + 100%) / 2)" }}
          priority
          loading="eager"
        />
      );
    case ImageType.FULL_IMAGE:
      return (
        <NextImage
          {...rest}
          width="0"
          height="0"
          sizes="100vw"
          alt={rest.alt || "Image"}
          style={{
            height: "auto",
            width: "100vw",
          }}
          priority
          loading="eager"
        />
      );
    default:
      return null;
  }
};

export default Image;
