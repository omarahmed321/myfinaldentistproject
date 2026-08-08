import React from 'react'

export default function TitleAndLogo() {
  return (
<div className="titleAndLogo flex gap-3   ">
    <h1 className=' text-[#111827] font-bold md:text-[30px] lg:text-[36px] text-[24px] '>عيادة الأسنان</h1>
    <div className="logo bg-[#0D9488] rounded-xl lg:h-12 h-10 w-10 lg:w-12 flex justify-center items-center "><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg></div>
</div>
  )
}
