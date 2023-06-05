import { Navigate } from "react-router-dom";
const Protected = ({ currentUser }) => {
  if (currentUser?.email !== "admin@admin.com") {
    return <Navigate to="/" />;
  }
  return <Navigate to="/admin" />;
};
export default Protected;
