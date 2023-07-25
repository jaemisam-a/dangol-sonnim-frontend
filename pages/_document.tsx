import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="keyword" content="단골손님, 동네가게 구독" />
        <meta
          name="description"
          content="구독으로 단골손님을 만들고 싶은 소상공인과 저렴한 가격으로 꾸준히 서비스를 받고 싶은 손님을 위한 중개 플랫폼"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dangol.store" />
        <meta property="og:title" content="단골손님" />
        <meta property="og:image" content="https://dangol.store/images/logo/logo.png" />
        <meta
          property="og:description"
          content="구독으로 단골손님을 만들고 싶은 소상공인과 저렴한 가격으로 꾸준히 서비스를 받고 싶은 손님을 위한 중개 플랫폼"
        />
        <meta property="og:site_name" content="단골손님" />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
