import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";
import UpdateCabin from "./UpdateCabin";
import DeleteCabin from "./DeleteCabin";
import styled from "styled-components";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      {/* <button onClick={handleDuplicate} disabled={isCreating}>
        {isCreating ? <SpinnerMini /> : <HiSquare2Stack />}
      </button>
    
      */}
      <Menus.Menu>
        <Menus.Toggle id={id}>
          <Menus.List id={id}>
            <Menus.Button onClick={handleDuplicate} disabled={isCreating}>
              {isCreating ? (
                <>
                  <SpinnerMini /> <span>Loading</span>
                </>
              ) : (
                <>
                  <HiSquare2Stack /> <span>Duplicate</span>
                </>
              )}
            </Menus.Button>
            <UpdateCabin cabinToEdit={cabin} />
            <DeleteCabin cabinId={id} />
          </Menus.List>
        </Menus.Toggle>
      </Menus.Menu>
    </Table.Row>
  );
}
