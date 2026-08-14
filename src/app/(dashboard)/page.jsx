'use client'
import { Calendar, Calendar1, CheckCircle2, Trash, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function page() {
  let oneOfTheGrid = " h-36.5 bg-white rounded-lg border border-[#E2E8F0] shadow-md p-6.25"
  const [patients, setPatients] = useState([])
  useEffect(()=>{
  let isThereIsData=  localStorage.getItem('data');
    let patients = isThereIsData? setPatients(  JSON.parse(isThereIsData) ) : setPatients([])
  

  },[])

  return (
    <div className=' w-full h-full md:p-8 p-3 gap-8 flex flex-col '>
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
<p className=' text-end  text-black font-bold text-[30px]'>{patients.length}</p>
        </div>
      </div>


        <div className="appointmentsTable md:w-full   ">
 

     <table  dir="rtl" className="bg-white shadow-md w-full   overflow-hidden   border border-[#E2E8F0] rounded-xl text-right ">
  <thead>
    <tr dir="rtl" className="  text-right"><td className=" text-[#0F172B] whitespace-nowrap font-bold py-4 pr-3 ">سجل المواعيد</td></tr>
    <tr className="bg-[#fbfcfd] text-[#62748E] font-medium ">


      <td className="py-4 px-2  text-center  md:px-6">المريض</td>
      
      <td className="py-4 px-2  text-center  md:px-6">التاريخ</td>
      <td className="py-4 px-2 text-center md:px-6">الوقت</td>
      <td className="py-4 px-2 text-center md:px-6">الاجراء</td>
      <td className="py-4 px-2 text-center md:px-6">الحاله</td>
       
    </tr>
  </thead>
  <tbody>
{
  patients.map((el)=>(<tr key={el.id}>

  <td className=" text-[#0F172B] text-[10px] md:text-[18px]  font-medium py-5  text-center md:px-6">{el.name}</td>
  <td className=" text-[#0F172B] text-[10px] md:text-[18px]  font-medium py-5  text-center md:px-6">2020</td>
  <td className=" text-[#45556C] text-[10px] md:text-[18px]  text-center py-5  md:px-6">11:30</td>
  <td className=" text-[#45556C] text-[10px] md:text-[18px] text-center py-5  md:px-6"> حشوعصب </td>
  <td className=" py-5 px-2  md:px-6 text-center">
    <span className="  py-0.5 px-1 text-[10px] md:text-[18px] md:px-2 text-[#008236] bg-[#F0FDF4] rounded-full">مكتمل</span>
  </td>
  <td className="   ">
    <Trash className="text-[#90A1B9] " />
  </td>
</tr>))
}


  </tbody>
</table>

  </div>
    </div>)
}

