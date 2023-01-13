import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styled from "@emotion/styled";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type BannerProps = {
  images: { src: string; alt: string }[];
  height: string;
};

type ImageWrapperProps = {
  height: string;
};

const ImageWrapper = styled.div<ImageWrapperProps>`
  height: ${({ height }) => height};
  position: relative;
`;

const SlickImage = styled(Image)`
  object-fit: cover;
`;

const Banner = ({ images, height }: BannerProps) => {
  if (images?.length > 1) {
    return (
      <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false}>
        {images?.map((image) => (
          <ImageWrapper height={height} key={image.src}>
            <SlickImage src={image.src} alt={image.alt} fill={true} unoptimized={true} />
          </ImageWrapper>
        ))}
      </Carousel>
    );
  } else if (images?.length === 1) {
    return (
      <ImageWrapper height={height}>
        <SlickImage src={images[0].src} alt={images[0].alt} fill={true} unoptimized={true} />
      </ImageWrapper>
    );
  } else {
    return null;
  }
};

export default Banner;
