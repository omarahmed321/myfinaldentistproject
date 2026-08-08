'use client'
import SideBar from "@/components/SideBar.jsx"
import NavBar from "../../components/NavBar";
import { useState } from "react";
export default function DashboardLayout({ children }) {
    const [modal ,setModal]= useState(false);
  return (
  <div className=" w-full  flex bg-[#E2E8F0]  min-h-dvh ">
    <div className="flex-1 flex flex-col min-w-0">
         
      <NavBar modal={modal} setModal={setModal} />
 <div className=" flex-1 ">{children}</div>
     
    </div>
    
    <SideBar modal={modal} setModal={setModal} />

  
  </div>
     
 
  );
}