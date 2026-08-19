import { Menu, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function NavBar({modal,setModal}) {
  const pathName =usePathname();
const [title,setTitle]=useState('')
  useEffect(()=>{
    if(pathName === '/'){
setTitle("نظرة عامة")
    }
    else if(pathName ==='/patients'){
      setTitle("المرضي")
    }
    else if(pathName === '/addpatient'){
      setTitle( <div className=''>
        <span className='  text-[#62748E] '><Link className='' href="/patients" >المرضي</Link> / </span>
اضافه مريض جديد
      </div>)
    }
    else if(pathName === "/patientdetail"){
        setTitle( <div className=''>
        <span className='  text-[#62748E] '><Link className='' href="/patients" >المرضي</Link> {' < '} </span>
تفاصيل المريض
      </div>)
    }
    else if(pathName === "/appointments"){
      setTitle("إدارة المواعيد")
    }
  },[pathName])

  return (
<div className='w-full py-2 px-2 md:py-4 md:px-8 flex justify-between  items-center bg-white border-b border-[#45556C]/20 text-[#0F172B] font-bold text-[20px]'>
  {/* left Side */}
     <div className="leftSide flex gap-3"> 
   <p className=' text-[#62748E] h-10 w-10 flex justify-center items-center bg-gray-200 rounded-full border border-white/30'>o</p>
       
       {pathName !== '/addpatient' && (
  <Link
    href="/addpatient"
    className="flex bg-[#0D9488] text-white items-center justify-center rounded-lg p-2 md:py-2 md:px-4 text-xs md:text-sm font-semibold hover:scale-105 transition"
  >
    <span className="hidden md:inline">إضافة مريض</span>
    <Plus className="w-4 h-4 md:w-5 md:h-5" />
  </Link>
)}
        </div> 
        {/* right side */}
<div className="rightSide flex gap-2.5 md:gap-3 items-center md:text-[25px] text-[18px] ">
  <span className=' whitespace-nowrap '>{title}</span>  
 <div className="smallAndMidSideBar pt-1 pr-4 lg:hidden">
      <button onClick={()=>{setModal(true)}}>    <Menu /></button>
  
    </div>
</div>

    </div>
  )
}
