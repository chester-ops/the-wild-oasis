import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();
  return (
    <Button
      color="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      {isCheckingOut ? <SpinnerMini /> : "Checkout"}
    </Button>
  );
}

export default CheckoutButton;
