import React, { useRef } from "react";
import Script from "next/script";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
  }
}

type KakaoMapProp = {
  address: string;
};

const KakaoMap = ({ address }: KakaoMapProp) => {
  const kakaoMapRef = useRef<HTMLInputElement>(null);

  const onLoadKakaoMap = () => {
    const kakaoMap = window.kakao.maps;

    kakaoMap.load(async function () {
      const options = {
        center: new kakaoMap.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new kakaoMap.Map(kakaoMapRef.current, options);
      const geocoder = new kakaoMap.services.Geocoder();
      const markerSize = new kakaoMap.Size(28, 28);
      const markerImage = new kakaoMap.MarkerImage("/icons/Marker.svg", markerSize);

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakaoMap.services.Status.OK) {
          const coords = new kakaoMap.LatLng(result[0].y, result[0].x);
          const marker = new kakaoMap.Marker({
            map: map,
            position: coords,
            image: markerImage,
          });
          map.setCenter(coords);
          marker.setMap(map);
        }
      });
    });
  };
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services`}
        onLoad={onLoadKakaoMap}
      />
      <div ref={kakaoMapRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
};

export default KakaoMap;
