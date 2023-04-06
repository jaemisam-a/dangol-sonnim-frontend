import { useEffect } from "react";

export const AccessTokenAuth = () => {
  useEffect(() => {
    // TODO: accessToken 유효성 검증 API 추가
    const intervalCheck = setInterval(() => {
      // TODO: accessToken 유효성 검증 API 추가
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalCheck);
  }, []);
};
