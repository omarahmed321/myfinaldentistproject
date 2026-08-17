'use client'
import React from 'react'

import {  SearchX, UserCircle } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className=' w-full h-dvh bg-white/95 flex flex-col '>
        {/* the navBar */}
<div className="upperNavBar w-full py-4.5 flex justify-between items-center px-8 border-b border-[#e2e8f0]">

    <p className=' text-[#62748E] h-10 w-10 flex justify-center items-center bg-gray-200 rounded-full border border-white/30'><UserCircle /></p>
        <p className=' text-[#0F172B] text-[20px] font-bold'>خطأ 404</p>
</div>

{/* the 404 content */}

<main className=' w-full h-full flex items-center justify-center px-4'>
<div className="content flex flex-col items-center md:w-[60%] lg:w-[30%]  w-full mx-auto  ">
    <p className='   mb-5 text-[#0D9488] bg-[#F0FDFA] rounded-2xl lg:rounded-3xl lg:h-30 w-20 h-20 lg:w-30  flex justify-center items-center '><SearchX  className='lg:w-16 w-10 h-10 lg:h-16'/></p>
    <p className=' text-[#45556C] font-bold'>Error 404</p>
    <p className=' text-[#0F172B] whitespace-nowrap  text-[20px] lg:text-[40px] font-bold'>عذراً، الصفحة غير موجودة</p>
    <p className=' mb-10 text-[#62748E] text-center'>الصفحة التي تبحث عنها غير موجودة أو تم نقلها. ربما كتبت العنوان بشكل خاطئ أو تم حذف الصفحة من النظام.</p>
<div className="buttons gap-3 flex-col-reverse  md:flex-row w-full justify-center flex items-center">
    <button className='px-8 w-full md:w-auto py-3 border border-[#E2E8F0] text-[#45556C] rounded-xl font-bold'>الإبلاغ عن مشكلة</button>
    <Link href='/' className=' w-full md:w-auto flex items-center justify-center px-8 py-3 bg-[#0D9488] text-white rounded-xl font-bold '>العودة للوحة التحكم</Link>
    
</div>
</div>
</main>




 
  
              
       
    </div>
  )
}
