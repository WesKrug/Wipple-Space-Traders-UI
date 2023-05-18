import React from "react";
import { Navbar } from "../Navbar/Navbar";

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {  
  return (
    <div className="@h-screen">
      <Navbar />
      <main className="@flex @justify-center @items-center">{children}</main>
    </div>
  );
}
