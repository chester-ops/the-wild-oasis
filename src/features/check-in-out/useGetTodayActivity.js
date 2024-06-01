import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useGetTodayActivity() {
  const { isLoading: isLoadingTodayActivity, data: todayActivities } = useQuery(
    {
      queryKey: ["today-activity"],
      queryFn: getStaysTodayActivity,
    }
  );
  return { isLoadingTodayActivity, todayActivities };
}
