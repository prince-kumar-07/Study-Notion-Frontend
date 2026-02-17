import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleRoute = ({ children, allowedRole }) => {
  const { user } = useSelector((state) => state.profile);

  if (user?.accountType !== allowedRole) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
};

export default RoleRoute;
