import { Menu, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function NavBar({modal,setModal}) {
  let handleModal =()=>{
setModal(true)

}
  return (
<div className='w-full py-2 px-2 md:py-4 md:px-8 flex justify-between  items-center bg-white border-b border-[#45556C]/20 text-[#0F172B] font-bold text-[20px]'>
  {/* left Side */}
     <div className="leftSide flex gap-3"> 
    <p className=' text-[#45556C] bg-[#F1F5F9] md:text-[16px] p-2 rounded-full flex  justify-center items-center text-center text-[12px]  '>م ع</p>
        <Link href='/addpatient' className=' hover:transition-transform hover:scale-105 flex bg-[#0D9488]  text-white items-center rounded-md md:w-auto md:h-auto w-10 text-[12px]  md:py-2 md:px-4 md:text-[18px] h-8 font-semibold' > <span className='hidden md:flex'>إضافة مريض </span> <Plus className=' md:ml-2 mx-auto md:mx-0' /></Link>
        </div> 
        {/* right side */}
<div className="rightSide flex gap-2.5 md:gap-3 items-center md:text-[20px] text-[18px] ">
    نظرة عامة 
 <div className="smallAndMidSideBar pt-1 pr-4 lg:hidden">
      <button onClick={handleModal}>    <Menu /></button>
  
    </div>
</div>

    </div>
  )
}
