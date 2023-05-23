import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material";

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) { 
  return (
    <div className="@h-screen">
      <Navbar />
      <main className="">{children}</main>
    </div>
  );
}
