import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { useGetRecentBookings } from "./useGetRecentBookings";
import { useGetRecentStays } from "./useGetRecentStays";
import { useGetCabins } from "../cabins/useGetCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { confirmedStays, isLoadingStays } = useGetRecentStays();
  const { recentBookings, isLoading, numDays } = useGetRecentBookings();
  const { numCabins, isLoading: isLoadingCabins } = useGetCabins();
  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={numCabins}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
