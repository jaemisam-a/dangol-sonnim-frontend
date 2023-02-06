import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styled from "@emotion/styled";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type BannerProps = {
  images: { src: string; alt: string }[];
};

const SlickImage = styled(Image)`
  object-fit: contain;
  position: static !important;
`;

const Banner = ({ images }: BannerProps) => {
  if (images?.length > 1) {
    return (
      <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false}>
        {images?.map((image) => (
          <div key={image.src}>
            <SlickImage src={image.src} alt={image.alt} fill={true} unoptimized={true} />
          </div>
        ))}
      </Carousel>
    );
  } else if (images?.length === 1) {
    return (
      <div>
        <SlickImage src={images[0].src} alt={images[0].alt} fill={true} unoptimized={true} />
      </div>
    );
  } else {
    return null;
  }
};

export default Banner;
