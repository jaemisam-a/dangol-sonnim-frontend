/**
 * 드롭다운을 열고 외부를 클릭해서 닫을 수 있게 만든 훅
 * ref를 만들어서 드롭다운을 여는 버튼에 넣고
 * useDropdown 훅을 선언해서 defaultValue에 해당 ref를 넣고 사용
 */

import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";

type useDropdownType = (
  buttonRef: RefObject<HTMLDivElement>,
) => [boolean, Dispatch<SetStateAction<boolean>>];

const useDropdown: useDropdownType = (buttonRef) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // FIXME: event의 타입을 어떻게 지정해야할지 찾지 못함. 추후 수정 예정
    const pageClickEvent = (event: any) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", pageClickEvent);

    return () => {
      document.removeEventListener("click", pageClickEvent);
    };
  }, []);

  return [isOpen, setIsOpen];
};

export default useDropdown;
