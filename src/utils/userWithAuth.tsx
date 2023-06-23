import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useStore } from "zustand";

import useLoginStore from "src/store/userLogin";
import FullPageSpinner from "common/spinner/fullPage";
import { validateUserToken } from "pages/api/user";

type Authority = "all" | "loginOnly" | "guestOnly";

const LOGIN_ROUTE = "/login";

const UserWithAuth = (WrappedComponent: (props: any) => JSX.Element) => {
  const ComponentWithAuth = (props: any) => {
    const { pathname, replace } = useRouter();
    const { mutateAsync } = useMutation(validateUserToken);

    const { isLogin, login, logout } = useStore(useLoginStore);
    const [authority, setAuthority] = useState<Authority>();

    const goToLoginRoute = () => {
      replace(
        {
          pathname: LOGIN_ROUTE,
          query: {
            from: pathname,
          },
        },
        LOGIN_ROUTE
      );
    };

    /** 페이지 별 권한 설정 */
    useEffect(() => {
      if (pathname.includes(LOGIN_ROUTE)) {
        setAuthority("guestOnly");
      } else if (pathname.includes("/my") || pathname.includes("/payment")) {
        setAuthority("loginOnly");
      } else {
        setAuthority("all");
      }
    }, [pathname]);

    /** 로그인 상태 유지, 토큰 유효성 검사 */
    useEffect(() => {
      const token = window.localStorage.getItem("userAccessToken");
      if (token) {
        login();
      } else {
        logout();
      }

      if (token && isLogin) {
        mutateAsync().catch(() => {
          logout();
          goToLoginRoute();
        });
      }
    }, []);

    /** 페이지 접근 제한 */
    useEffect(() => {
      window.localStorage.setItem("isUserLogin", isLogin.toString());

      if (!isLogin && authority === "loginOnly") {
        goToLoginRoute();
      }
      if (isLogin && authority === "guestOnly") {
        replace("/");
      }
    }, [isLogin, authority]);

    if (!isLogin && authority === "loginOnly") {
      return <FullPageSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default UserWithAuth;
