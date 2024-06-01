import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "../ui/ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export default function DarkModeToggle() {
  const { isDark, toggleDark } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDark}>
      {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
