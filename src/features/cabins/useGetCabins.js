import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useGetCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const numCabins = cabins?.length;

  return { isLoading, cabins, numCabins };
}
