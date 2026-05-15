import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthMiddleware = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center", fontSize: "18px" }}>
        Đang kiểm tra quyền truy cập hệ thống...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthMiddleware;
