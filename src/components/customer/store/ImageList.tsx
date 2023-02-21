import React, { MouseEvent, useRef, useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";

type ImageListProps = { images: { src: string; alt: string }[] };

const imageWrapper = css`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.983rem;
  overflow-x: scroll;
  cursor: grab;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 9.25rem;
    height: 9.25rem;
    flex-shrink: 0;
  }
`;

const ImageList = ({ images }: ImageListProps) => {
  const imagesRef = useRef<HTMLDivElement>(null);
  const imageContainer = imagesRef.current as HTMLDivElement;
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + imageContainer.scrollLeft);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDrag) return;
    const { scrollWidth, clientWidth, scrollLeft } = imageContainer;
    imageContainer.scrollLeft = startX - e.pageX;

    if (scrollLeft === 0) {
      setStartX(e.pageX);
    } else if (scrollWidth <= clientWidth + scrollLeft) {
      setStartX(e.pageX + scrollLeft);
    }
  };

  const onDragEnd = () => {
    if (!isDrag) return;
    setIsDrag(false);
  };

  return (
    <div
      draggable={true}
      ref={imagesRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      css={imageWrapper}
    >
      {images.map((img) => (
        <Image key={img.src} src={img.src} alt={img.alt} width={148} height={148} />
      ))}
    </div>
  );
};

export default ImageList;
