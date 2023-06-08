import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useStore } from "zustand";

import useOwnerLoginStore from "src/store/ownerLogin";
import { validateOwnerToken } from "pages/api/owner/login";
import FullPageSpinner from "common/spinner/fullPage";

type Authority = "all" | "loginOnly" | "guestOnly";

const HOME_ROUTE = "/owner";
const LOGIN_ROUTE = "/owner/login";

const withAuth = (WrappedComponent: (props: any) => JSX.Element) => {
  const ComponentWithAuth = (props: any) => {
    const { pathname, back, replace } = useRouter();
    const { mutateAsync } = useMutation(validateOwnerToken);

    const { isLogin, login, logout } = useStore(useOwnerLoginStore);
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
      if (pathname.includes(LOGIN_ROUTE) || pathname.includes("/owner/signup")) {
        setAuthority("guestOnly");
      } else if (pathname === HOME_ROUTE) {
        setAuthority("all");
      } else {
        setAuthority("loginOnly");
      }
    }, [pathname]);

    /** 로그인 상태 유지, 토큰 유효성 검사 */
    useEffect(() => {
      const token = window.localStorage.getItem("accessToken");
      if (token) {
        login();
      } else {
        logout();
      }

      if (isLogin) {
        mutateAsync().catch(() => {
          logout();
          goToLoginRoute();
        });
      }
    }, []);

    /** 페이지 접근 제한 */
    useEffect(() => {
      window.localStorage.setItem("isLogin", isLogin.toString());

      if (!isLogin && authority === "loginOnly") {
        goToLoginRoute();
      }
      if (isLogin && authority === "guestOnly") {
        back();
      }
    }, [isLogin, authority]);

    if (!isLogin && authority === "loginOnly") {
      return <FullPageSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
