import Image from "next/image";
import styled from "styled-components";

const ImagesRowDiv = styled.div`
  width: 100%;
  max-width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-top: 10px;
  overflow: scroll;
  overflow-y: hidden;
`;

const ImageWithActionsDiv = styled.div`
  width: auto;
  height: 120px;
  max-height: 120px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: right;
  cursor: pointer;
`;

interface ImagesRowProps {
  images: string[];
  imagesAlt?: string;
  onImageClick?: (src: string) => void;
}

const ImagesRow = ({ images, imagesAlt, onImageClick }: ImagesRowProps) => {
  return (
    <ImagesRowDiv>
      {images.map((image, idx) => (
        <ImageWithActionsDiv
          key={idx}
          onClick={() => {
            onImageClick?.(image);
          }}
        >
          <Image
            src={image}
            width="0"
            height="0"
            sizes="100vw"
            alt={imagesAlt || "Nasa Image"}
            style={{
              height: "100%",
              width: "auto",
              minWidth: "150px",
              objectFit: "cover",
            }}
          />
        </ImageWithActionsDiv>
      ))}
    </ImagesRowDiv>
  );
};

export default ImagesRow;
