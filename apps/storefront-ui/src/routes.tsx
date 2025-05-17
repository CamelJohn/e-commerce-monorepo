import { createBrowserRouter, Outlet, RouterProvider, type RouteObject } from 'react-router-dom';
import HomePage from './pages/home/home.page';
import ProductPage from './pages/product/product.page';
import VendorPage from './pages/vendor/vendor.page';
import VendorsPage from './pages/vendor/vendors.page';
import ProductsPage from './pages/product/products.page';
import MainLayout from './shared/MainLayout';
import GlobalThemeProvider from './theme/provider';
import { VendorsProvider } from './pages/vendor/vendor.context';
import { ProductsProvider } from './pages/product/product.context';
import { CartProvider } from './cart/cart.context';
import CartDrawer from './cart/cart.drawer';
import CheckoutPage from './pages/checkout/checkout.page';

const vendorRoutes: RouteObject[] = [
  {
    path: 'vendor',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <VendorsPage />,
      },
      {
        path: ':vendorId',
        element: <VendorPage />,
      },
    ],
  },
];

const productRoutes: RouteObject[] = [
  {
    path: 'product',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: ':productId',
        element: <ProductPage />,
      },
    ],
  },
];

const checkoutRoutes: RouteObject[] = [{
  path: 'checkout',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <CheckoutPage />,
    },
  ]
}]

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <GlobalThemeProvider>
        <VendorsProvider>
          <ProductsProvider>
            <CartProvider>
              <MainLayout />
              <CartDrawer />
            </CartProvider>
          </ProductsProvider>
        </VendorsProvider>
      </GlobalThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...vendorRoutes,
      ...productRoutes,
      ...checkoutRoutes
    ],
  },
];

const router = createBrowserRouter(routes);

const MainRouter = () => <RouterProvider router={router} />;

export default MainRouter;
