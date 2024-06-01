import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import { useGetCabins } from "./useGetCabins";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { isLoading, cabins } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // Filtering Cabins
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  switch (filterValue) {
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
  }

  // Sorting Cabins
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) =>
    typeof a[field] === "string"
      ? a[field].localeCompare(b[field]) * modifier
      : (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" columngap="2.4rem">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
