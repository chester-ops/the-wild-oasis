import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { upsertCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabin, id }) => upsertCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateCabin, isUpdating };
}
