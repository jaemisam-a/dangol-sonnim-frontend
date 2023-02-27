import React, { MouseEvent, ReactNode, useRef, useState } from "react";
import { css } from "@emotion/react";

type SliderProps = {
  children: ReactNode;
  padding?: string;
  gap: string;
};

const imageWrapper = (padding: string, gap: string) => css`
  display: flex;
  gap: ${gap};
  padding: ${padding};
  overflow-x: scroll;
  cursor: grab;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slider = (props: SliderProps) => {
  const element = useRef<HTMLDivElement>(null);
  const elementContainer = element.current as HTMLDivElement;
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + elementContainer?.scrollLeft);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDrag) return;
    const { scrollWidth, clientWidth, scrollLeft } = elementContainer;
    elementContainer.scrollLeft = startX - e.pageX;

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
      ref={element}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      css={imageWrapper(props.padding as string, props.gap)}
    >
      {props.children}
    </div>
  );
};

export default Slider;
