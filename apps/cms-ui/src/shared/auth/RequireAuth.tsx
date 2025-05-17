import { Navigate, useLocation } from 'react-router-dom';

// Replace with your real auth logic
const useAuth = () => {
  // Example: check localStorage or context
  return { isLoggedIn: !!localStorage.getItem('vendor_token') };
};

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}