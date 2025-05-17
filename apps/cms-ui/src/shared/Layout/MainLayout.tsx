import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { TopNav } from './TopNav';

const Main = styled.main`
  padding: ${({ theme }) => theme.layout.mainPadding};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: calc(100vh - ${({ theme }) => theme.layout.navHeight});
`;

const MainLayout = () => {
  return (
    <>
      <TopNav />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default MainLayout;
