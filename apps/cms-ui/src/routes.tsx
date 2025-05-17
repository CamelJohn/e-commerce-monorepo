import { createBrowserRouter,  RouterProvider, type RouteObject } from 'react-router-dom';
import GlobalThemeProvider from './theme/provider';
import MainLayout from './shared/Layout/MainLayout';
import DashboardPage from './pages/dashboard/dashboard.page';
import LoginPage from './pages/auth/login.page';
import RegisterPage from './pages/auth/register.page';
import RequireAuth from './shared/auth/RequireAuth';
import AccountPage from './pages/account/account.page';
import SubscriptionsPage from './pages/subscriptions/subscriptions.page';

const productRoutes: RouteObject[] = [
  {
    path: 'products',
    children: [
      // { index: true, element: <ProductListPage /> },
      // { path: 'new', element: <ProductWizardPage /> },
      // { path: ':id', element: <ProductWizardPage /> }, // edit
    ],
  },
];

const orderRoutes: RouteObject[] = [
  {
    path: 'orders',
    children: [
      // { index: true, element: <OrderListPage /> },
      // { path: ':id', element: <OrderDetailPage /> },
    ],
  },
];

const accountRoutes: RouteObject[] = [
  { path: 'account', element: <AccountPage /> },
];

const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <GlobalThemeProvider>
        <MainLayout />
      </GlobalThemeProvider>
    ),
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
];

const subscriptionRoutes: RouteObject[] = [
  { path: 'subscriptions', element: <SubscriptionsPage /> }
]

const routes: RouteObject[] = [
  ...authRoutes,
  {
    path: '/',
    element: (
      <GlobalThemeProvider>
        <RequireAuth>
          <MainLayout />
        </RequireAuth>
      </GlobalThemeProvider>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      ...productRoutes,
      ...orderRoutes,
      ...accountRoutes,
      ...subscriptionRoutes,
    ],
  },
];

const router = createBrowserRouter(routes);

const MainRouter = () => <RouterProvider router={router} />;

export default MainRouter;
