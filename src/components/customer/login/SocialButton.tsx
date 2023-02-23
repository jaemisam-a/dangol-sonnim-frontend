import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import useLoginStore from "src/store/login";

type SocialButtonProps = {
  image: string;
  name: string;
  bgColor: string;
  color: string;
};

const wrapper = (color: string, bgColor: string, name: string) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${color};
  background-color: ${bgColor};
  border-radius: 0.25rem;
  height: 3rem;
  gap: 0.5rem;
  ${Texts.S1_16_B}
  ${name === "구글" && `border: 1px solid ${Colors.neutral30}`};
`;

const SocialButton = (props: SocialButtonProps) => {
  const { login } = useLoginStore();

  const onLogin = () => {
    // FIXME: 로그인 기능 연동
    login();
  };
  return (
    <>
      <button css={wrapper(props.color, props.bgColor, props.name)} onClick={onLogin}>
        <Image src={props.image} alt={props.name} width={20} height={20} />
        <div>{props.name}로 시작하기</div>
      </button>
    </>
  );
};

export default SocialButton;
