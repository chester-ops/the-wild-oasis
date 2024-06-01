import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteBooking({ bookingId, children }) {
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <Modal.Open opens="delete-booking">{children}</Modal.Open>
      <Modal.Window name="delete-booking">
        <ConfirmDelete
          resourceName="booking"
          disabled={isDeleting}
          onConfirm={() => {
            if (id) deleteBooking(bookingId, { onSettled: () => navigate(-1) });
            else deleteBooking(bookingId);
          }}
        />
      </Modal.Window>
    </>
  );
}
