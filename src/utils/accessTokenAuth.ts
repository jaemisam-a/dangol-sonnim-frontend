import { useEffect } from "react";

export const AccessTokenAuth = () => {
  const valid = () => {
    // TODO: accessToken 유효성 검증 API 추가
  };

  useEffect(() => {
    valid();
    const intervalCheck = setInterval(() => {
      valid();
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalCheck);
  }, []);
};
