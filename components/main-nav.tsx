import { Header } from "@/payload-types";
import React from "react";

export const MainNav: React.FC<Header["mainMenu"]> = ({ items }) => {
  if (!items) return null;

  return <div>MainNav</div>;
};
