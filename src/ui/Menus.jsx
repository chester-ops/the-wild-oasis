import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical, HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.$position.x}px;
  top: calc(100% + ${(props) => props.$position.y}px);
  z-index: 40;
  min-width: 160px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
StyledList.defaultProps = {
  $position: {
    x: 0,
    y: 8,
  },
};

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenuContext.Provider value={{ openId, open, close }}>
      <div>{children}</div>
    </MenuContext.Provider>
  );
}

function Toggle({ id, children }) {
  const { open, close, openId } = useContext(MenuContext);
  const isOpen = id === openId;
  function handleClick() {
    if (isOpen) close();
    else open(id);
  }
  return (
    <div style={{ position: "relative" }}>
      <StyledToggle onClick={handleClick}>
        {isOpen ? <HiXMark /> : <HiEllipsisVertical />}
      </StyledToggle>
      {children}
    </div>
  );
}
function List({ id, children }) {
  const { openId, close: closeMenu } = useContext(MenuContext);
  const { ref } = useOutsideClick(closeMenu);
  if (openId !== id) return null;
  return (
    <StyledList ref={ref} $position={{ x: 0, y: 10 }}>
      {children}
    </StyledList>
  );
}
function Button({ children, onClick }) {
  return (
    <li>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;
