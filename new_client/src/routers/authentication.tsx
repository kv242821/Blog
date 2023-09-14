import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface IAuthenticationProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function Authentication({
  children,
  fallback,
}: IAuthenticationProps) {
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  return isAuthenticated ? (
    <>{children}</>
  ) : fallback ? (
    <>{fallback}</>
  ) : (
    <Navigate to="/" />
  );
}
