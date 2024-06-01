import { HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Menus from "../../ui/Menus";

export default function UpdateCabin({ cabinToEdit }) {
  return (
    <>
      <Modal.Open opens="edit-cabin-form">
        <Menus.Button>
          <HiPencil />
          <span>Edit</span>
        </Menus.Button>
      </Modal.Open>
      <Modal.Window name="edit-cabin-form">
        <CreateCabinForm cabinToEdit={cabinToEdit} />
      </Modal.Window>
    </>
  );
}
