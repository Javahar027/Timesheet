import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";

function AppRouter() {
  const { userData } = useContext(UserContext);

  return <>{userData ? <PrivateRoutes /> : <PublicRoutes />}</>;
}

export default AppRouter;
