// src/middleware/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isSavedLocalStorage } from "../config/config.ts";
interface ProtectedRouteProps {
  redirectPath?: string;
}

/**
 * Protect routes — if token exists we render child routes (Outlet),
 * otherwise redirect to login. Also reacts to 'auth:logout' event.
 */
export default function ProtectedRoute({
  redirectPath = "/",
}: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    isSavedLocalStorage("token")
  );

  useEffect(() => {
    const onLogout = () => setIsAuthenticated(false);
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}
