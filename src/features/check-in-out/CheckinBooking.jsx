import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useGetSettings } from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmBreakfast, setConfirmBreakfast] = useState(false);
  const { isLoading, booking } = useGetBooking();
  const { settings, isLoading: gettingSettings } = useGetSettings();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  function handleCheckin() {
    if (confirmBreakfast) {
      checkin({
        id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ id, breakfast: {} });
    }
  }

  if (isLoading || gettingSettings) return <Spinner />;
  const {
    id,
    guests: { fullName },
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={confirmBreakfast}
            onChange={() => {
              setConfirmBreakfast((b) => !b);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          id="confirm"
          disabled={confirmPaid}
        >
          I confirm that {fullName} has paid the total amount of{" "}
          {!confirmBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          {isCheckingIn ? <SpinnerMini /> : `Check in booking #${id}`}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
