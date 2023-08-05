import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../User/login";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default PublicRoutes;
