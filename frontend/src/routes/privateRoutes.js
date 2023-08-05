import React from "react";
import { Route, Routes , Navigate} from "react-router-dom";
import UserLandPage from "../pages/userLandPage";



function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/userLandPage" element={<UserLandPage />} />
      <Route path="/" element={<Navigate to="/userLandPage" />} />
      <Route path="*" element={<Navigate to="/userLandPage" />} />
    </Routes>
  );
}

export default PrivateRoutes;
