import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import DeleteBooking from "./DeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useGetBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  const { status, id } = booking;

  function handleCheckout() {
    checkout(id);
    navigate("/");
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>
            <HiArrowDownOnSquare />
            <span>Check In</span>
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={handleCheckout} disabled={isCheckingOut}>
            <HiArrowUpOnSquare />
            <span>Check Out</span>
          </Button>
        )}
        <Modal>
          <DeleteBooking bookingId={id}>
            <Button color="danger">
              <HiTrash />
              <span>Delete</span>
            </Button>
          </DeleteBooking>
        </Modal>
        <Button color="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
