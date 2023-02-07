import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Colors, Texts } from "styles/common";

type HeaderProps = {
  subTitle?: string;
};

type WrapperProps = {
  pathname: string;
};

const Wrapper = styled.header<WrapperProps>`
  position: sticky;
  top: 0;
  height: 3.25rem;
  background-color: ${Colors.white};
  border: ${(props) => props.pathname !== "/customer" && `1px solid ${Colors.neutral20}`};
`;

const InnerWrapper = styled.div<WrapperProps>`
  padding: ${(props) => (props.pathname === "/customer" ? "0.5rem" : "0.75rem")} 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.25rem;
  color: ${Colors.neutral90};
`;

const PointerButton = styled(Image)`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  ${Texts.B2_14_R_line}
`;

const ButtonDot = styled.span`
  ${Texts.B2_14_R1}
`;

const HiddenItem = styled.div`
  visibility: hidden;
  width: 28px;
  height: 28px;
`;

const PageTitle = styled.div`
  ${Texts.S1_16_R}
`;

const Header = (props: HeaderProps) => {
  const { pathname } = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Wrapper pathname={pathname}>
      <InnerWrapper pathname={pathname}>
        {pathname === "/customer" ? (
          <>
            <PointerButton src="/images/Logo.png" alt="logo" width="27" height="36" />
            <Buttons>
              {isLoggedIn ? (
                <PointerButton src="/images/Profile.png" alt="profile" width="34" height="34" />
              ) : (
                <>
                  <TextButton>사장님 페이지</TextButton>
                  <ButtonDot>•</ButtonDot>
                  <TextButton onClick={() => setIsLoggedIn(true)}>로그인/회원가입</TextButton>
                </>
              )}
            </Buttons>
          </>
        ) : (
          <>
            <PointerButton
              src="/images/Arrow_Left_MD.png"
              alt="arrow_left"
              width="28"
              height="28"
            />
            <PageTitle>{props.subTitle}</PageTitle>
            {pathname.includes("store") ? (
              <PointerButton
                src="/images/Right_Accessory.png"
                alt="right_accessory"
                width="28"
                height="28"
              />
            ) : (
              <HiddenItem />
            )}
          </>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default Header;
