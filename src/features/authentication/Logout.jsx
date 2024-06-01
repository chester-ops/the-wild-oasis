import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { logout, isLogginOut } = useLogout();
  return (
    <ButtonIcon disabled={isLogginOut} onClick={logout}>
      {isLogginOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
