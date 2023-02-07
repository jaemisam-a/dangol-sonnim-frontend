import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { css } from "@emotion/react";

type BannerProps = {
  images: { src: string; alt: string }[];
};

const slickImage = css`
  object-fit: contain;
  position: static !important;
`;

const Banner = ({ images }: BannerProps) => {
  if (images?.length > 1) {
    return (
      <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false}>
        {images?.map((image) => (
          <div key={image.src}>
            <Image
              css={slickImage}
              src={image.src}
              alt={image.alt}
              fill={true}
              unoptimized={true}
            />
          </div>
        ))}
      </Carousel>
    );
  } else if (images?.length === 1) {
    return (
      <div>
        <Image
          css={slickImage}
          src={images[0].src}
          alt={images[0].alt}
          fill={true}
          unoptimized={true}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Banner;
