import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi2";
import { useDeleteCabin } from "./useDeleteCabin";
import Menus from "../../ui/Menus";

export default function DeleteCabin({ cabinId }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  return (
    <>
      <Modal.Open opens="delete-cabin">
        <Menus.Button>
          <HiTrash />
          <span>Delete</span>
        </Menus.Button>
      </Modal.Open>
      <Modal.Window name="delete-cabin">
        <ConfirmDelete
          resourceName="cabin"
          disabled={isDeleting}
          onConfirm={() => deleteCabin(cabinId)}
        />
      </Modal.Window>
    </>
  );
}
