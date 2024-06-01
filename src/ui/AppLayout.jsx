import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import styled from "styled-components";

const AppContainer = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4.8rem 4.8rem 6.4rem;
  overflow: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function AppLayout() {
  return (
    <AppContainer>
      <AppHeader />
      <AppSidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </AppContainer>
  );
}
