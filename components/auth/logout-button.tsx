"use client";
import { logout } from "@/app/actions/logout";
import React from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}
const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <span className="cursor-point" onClick={onClick}>
      {children}
    </span>
  );
};

export default LogoutButton;
