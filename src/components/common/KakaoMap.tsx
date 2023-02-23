import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { css } from "@emotion/react";

declare const window: typeof globalThis & { kakao: any };

type KakaoMapProp = {
  address: string;
};

const mapStyle = css`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const KakaoMap = ({ address }: KakaoMapProp) => {
  const kakaoMapRef = useRef<HTMLInputElement>(null);

  const onLoadKakaoMap = () => {
    const kakaoMapObject = window.kakao.maps;

    kakaoMapObject.load(async () => {
      const options = {
        center: new kakaoMapObject.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new kakaoMapObject.Map(kakaoMapRef.current, options);
      const geocoder = new kakaoMapObject.services.Geocoder();
      const markerSize = new kakaoMapObject.Size(28, 28);
      const markerImage = new kakaoMapObject.MarkerImage("/icons/Marker.svg", markerSize);

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakaoMapObject.services.Status.OK) {
          const coords = new kakaoMapObject.LatLng(result[0].y, result[0].x);
          const marker = new kakaoMapObject.Marker({
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

  useEffect(() => {
    if (!window.kakao) return;
    onLoadKakaoMap();
  }, []);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services`}
        onLoad={onLoadKakaoMap}
      />
      <div ref={kakaoMapRef} css={mapStyle} />
    </>
  );
};

export default KakaoMap;
