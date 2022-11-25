import { Navigate } from "react-router-dom";
import { ROUTES } from "./Routes";

/**
 * this checks the stored user on local storage is authenticated
 * @param {*} child node
 * @returns children
 */
const VerifyRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("User"));
  if (user?.User) {
    return children;
  }

  return <Navigate to={ROUTES.LOGIN} />;
};

export default VerifyRoute;
