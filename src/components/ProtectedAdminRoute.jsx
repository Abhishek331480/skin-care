import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = ({ children }) => {
  const { user, isAuthenticated, authLoading } = useSelector(
    (state) => state.auth
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-semibold">
        Checking admin access...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;