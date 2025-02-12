import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader";

const ProtectiveRoute = ({
  admin=false,
  children,
}: {
  admin?: boolean;
  children: JSX.Element;
}) => {
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth
  );

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (admin && user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectiveRoute;
