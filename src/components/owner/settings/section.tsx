import React, { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { usePopper } from "react-popper";
import { css } from "@emotion/react";

import Kebab from "public/icons/menu/kebab.svg";
import { Colors, Texts } from "styles/common";
import Popover, { statusType } from "common/popover";
import useDropdown from "src/utils/useDropdown";

type StoreSectionProps = {
  children: ReactNode;
  sectionTitle: string;
  menuCount?: number;
  isLocation: boolean;
  isEmpty?: boolean;
  btnAction?: () => void;
  setStatus?: Dispatch<SetStateAction<statusType>>;
};

const wrapper = css`
  padding: 1.5rem 1.25rem 0 1.25rem;
`;

const headerWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const titleWrapper = css`
  display: flex;
  gap: 0.25rem;
`;

const title = css`
  ${Texts.S1_16_B}
`;

const count = css`
  ${Texts.S1_16_B}
  color: ${Colors.amber50};
`;

const registrationButton = css`
  color: ${Colors.amber50};
  ${Texts.B3_15_M2}
`;

const StoreSection = (props: StoreSectionProps) => {
  const kebabRef = useRef(null);
  const popoverRef = useRef(null);

  const [openPopover, setOpenPopover] = useDropdown(kebabRef);

  const { styles, attributes } = usePopper(kebabRef.current, popoverRef.current, {
    placement: "bottom-end",
  });

  return (
    <>
      <div css={wrapper}>
        <div css={headerWrapper}>
          <div css={titleWrapper}>
            <div css={title}>{props.sectionTitle}</div>
            <div css={count}>{props.menuCount}</div>
          </div>
          {!props.isLocation && (
            <div>
              {props.isEmpty ? (
                <button onClick={props.btnAction} css={registrationButton}>
                  {props.sectionTitle} 등록
                </button>
              ) : (
                <>
                  <button ref={kebabRef} onClick={() => setOpenPopover((prev) => !prev)}>
                    <Kebab />
                  </button>
                  <Popover
                    btnAction={props.btnAction}
                    label={props.sectionTitle}
                    isOpen={openPopover}
                    popoverRef={popoverRef}
                    style={styles.popper}
                    attributes={attributes.popper}
                    setStatus={props.setStatus}
                  />
                </>
              )}
            </div>
          )}
        </div>
        {props.children}
      </div>
    </>
  );
};

export default StoreSection;
