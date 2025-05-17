import { createBrowserRouter, Outlet, RouterProvider, type RouteObject } from 'react-router-dom';
import GlobalThemeProvider from './theme/provider';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <GlobalThemeProvider>
        <Outlet />
      </GlobalThemeProvider>
    ),
    children: [],
  },
];

const router = createBrowserRouter(routes);

const MainRouter = () => <RouterProvider router={router} />;

export default MainRouter;
