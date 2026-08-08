import { Calendar, Calendar1, CheckCircle2, Users } from 'lucide-react'
import React from 'react'

export default function page() {
  let oneOfTheGrid = " h-36.5 bg-white rounded-lg border border-[#E2E8F0] shadow-md p-6.25"
  return (
    <div className=' w-full h-full md:p-8 p-3 '>
      {/* Top */}
      <div className='md:grid flex flex-col-reverse  md:grid-cols-3 w-full gap-4 md:gap-6   '>
        {/* compeleted  */}
        <div className={`${oneOfTheGrid} text-[#155DFC]`}>
<div className='w-full flex justify-between items-center '>
  <p className=' text-[12px] font-bold bg-[#eff6ff] px-1 py-0.75 rounded-full'>مكتمل</p>
  <CheckCircle2 className='text-[#155DFC] rounded-lg bg-[#eff6ff] h-10 w-10 p-2' />
</div>
<p className=' text-[16px] text-[#62748e] text-end mt-3 mb-1 font-medium'>مكتمله اليوم</p>
<p className=' text-end  text-black font-bold text-[30px]'>12</p>
        </div>
        {/* appointments of the day */}
        <div className={oneOfTheGrid}>
<div className='w-full flex justify-between items-center '>
  <p className=' text-[12px] font-bold text-[#90A1B9] px-1.5 py-0.75 rounded-full bg-[#F8FAFC]'>اليوم</p>
  <Calendar className='text-[#e17100] rounded-lg bg-[#fbf2ec] h-10 w-10 p-2' />
</div>
<p className=' text-[16px] text-[#62748e] text-end mt-3 mb-1 font-medium'>مواعيد اليوم</p>
<p className=' text-end  text-black font-bold text-[30px]'>12</p>
        </div>
        {/*  the total of the patients */}
        <div className={`${oneOfTheGrid} `}>
<div className='w-full flex justify-between items-center '>
  <p className=' text-[12px] font-bold text-[#90A1B9] px-1.5 py-0.75 rounded-full bg-[#F8FAFC]'>اليوم</p>
  <Users className='text-[#009966] rounded-lg bg-[#ECFDF5] h-10 w-10 p-2' />
</div>
<p className=' text-[16px] text-[#62748E] text-end mt-3 mb-1 font-medium'>إجمالي المرضى</p>
<p className=' text-end  text-black font-bold text-[30px]'>12</p>
        </div>
      </div>
    </div>
  )
}
