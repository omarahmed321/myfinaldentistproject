'use client'
import { Calendar, Calendar1, CheckCircle2, Trash, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { readAppointmentsFromLocalStorage } from '@/utils/storage';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { readPatientsFromLocalStorage ,readCurrentUserFromLocalStorage ,readMyPatientsFromLocalStorage } from "@/utils/storage";
import Skeleton from "@/components/Skeletron";
import { paginate } from '@/utils/pagenation';
import PagenationButtons from '@/components/PagenationButtons';
export default function page() {
  /////////////////////////// some styles
  let oneOfTheGrid = " pb-2  h-auto bg-white rounded-lg border border-[#E2E8F0] hover:scale-105 transition-shadow md:shadow-none shadow-md hover:shadow-md duration-500 transition-transform p-6.25"
 /////////////////////////// some hooks
 const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState([])
  const [appointments ,setAppointments]= useState([])
const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 /////////////////////////// useEffect
  useEffect(()=>{
    // اليوسر الحالي
      setCurrentUser(readCurrentUserFromLocalStorage());
    // المرضي
setPatients(readMyPatientsFromLocalStorage());
    // لكن هنا المواعيد
  let appointmentsHere = readAppointmentsFromLocalStorage();
    // اليوسر الحالي
  const currentUser = readCurrentUserFromLocalStorage();
  // كل المرضي
    const allPatients = readPatientsFromLocalStorage();
  setAppointments(appointmentsHere);
setIsLoading(false)
  },[])
  /////////////////////////// filter todays date
  let todayDate = new Date().toISOString().split('T')[0];
let todaysAppointments = appointments.filter((app) => app.date === todayDate);
// يعني المفروض فكرتها تعمل اراي فيها فقط الحاجات المكتمله النهارده
 let theCompeletedAppointmentsToday = todaysAppointments.filter((appointment)=>( appointment.status == "مكتمل"))
    let numberOfTheAppointmentsCompeletedToday = theCompeletedAppointmentsToday.length
 /////////////////////////// pagination
const { items: paginatedData, totalPages, from, to, total } = paginate(todaysAppointments, currentPage, 5);


    if(isLoading)return <Skeleton />
  return (
    <div className=' w-full h-full md:p-8 p-3 gap-8 flex flex-col '>
      {/* Top */}
      <p className=' w-full font-bold text-[25px] ' dir='rtl'>أهلا يا {currentUser?.fullName}</p>
      <div className='md:grid flex flex-col-reverse  md:grid-cols-3 w-full gap-4 md:gap-6   '>
        {/* compeleted  */}
        <div className={`  ${oneOfTheGrid} text-[#155DFC] `}>
<div className='w-full flex justify-between items-center '>
  <p className=' text-[12px] font-bold bg-[#eff6ff] px-1 py-0.75 rounded-full '>مكتمل</p>
  <CheckCircle2 className='text-[#155DFC] rounded-lg bg-[#eff6ff] h-10 w-10 p-2' />
</div>
<p className=' text-[16px] text-[#62748e] text-end mt-3 mb-1 font-medium'>مكتمله اليوم</p>
<p className=' text-end  text-black font-bold text-[30px]'>{numberOfTheAppointmentsCompeletedToday}
  </p>
        </div>
        {/* appointments of the day */}
        <div className={oneOfTheGrid} onClick={()=>{router.push('/appointments')}}>
<div className='w-full flex justify-between items-center '>
  <p className=' text-[12px] font-bold text-[#90A1B9] px-1.5 py-0.75 rounded-full bg-[#F8FAFC]'>اليوم</p>
  <Calendar className='text-[#e17100] rounded-lg bg-[#fbf2ec] h-10 w-10 p-2' />
</div>
<p className=' text-[16px] text-[#62748e] text-end mt-3 mb-1 font-medium'>مواعيد اليوم</p>
<p className=' text-end  text-black font-bold text-[30px]'>{todaysAppointments.length}</p>
        </div>
        {/*  the total of the patients */}
        <div className={`${oneOfTheGrid} `} onClick={()=>{router.push('/patients')}}>
<div className='w-full flex justify-between items-center '>
  <p className=' text-[12px] font-bold text-[#90A1B9] px-1.5 py-0.75 rounded-full bg-[#F8FAFC]'>اليوم</p>
  <Users className='text-[#009966] rounded-lg bg-[#ECFDF5] h-10 w-10 p-2' />
</div>
<p className=' text-[16px] text-[#62748E] text-end mt-3 mb-1 font-medium whitespace-nowrap'>إجمالي المرضى</p>
<p className=' text-end  text-black font-bold text-[30px]'>{patients.length}</p>
        </div>
      </div>


        <div className="appointmentsTable md:w-full   ">
 

  <div className="appointmentsTable md:w-full shadow-lg bg-white  overflow-auto flex flex-col grow h-auto rounded-lg ">

 <div className="head w-full justify-between flex items-center px-2  md:px-6 rounded-t-lg   py-3 " dir="rtl">
  <p className="text-[#0F172B] text-lg font-bold whitespace-nowrap text-[16px]">مواعيد اليوم القادمة</p>
  <Link href='/appointments' className="text-[#0D9488] font-bold text-sm whitespace-nowrap text-[16px]">عرض كل المواعيد ←</Link>
</div>
    <table dir="rtl" className="bg-white shadow-md w-full   overflow-hidden   border-r border-b border-l border-[#E2E8F0] rounded-b-xl text-right ">
  <thead>
    <tr dir="rtl" className="     ">
   
   
         </tr>
    <tr className="bg-[#fbfcfd] text-[#62748E] font-medium ">
        <td className="py-4 px-2  text-center  md:px-6">المريض</td>
      <td className="py-4 px-2  text-center  md:px-6">التاريخ</td>
      <td className="py-4 px-2 text-center md:px-6">الوقت</td>
      <td className="py-4 px-2 text-center md:px-6">الاجراء</td>
      <td className="py-4  px-2 text-center md:px-6">الحاله</td>
  
    </tr>
  </thead>
  <tbody>
{
paginatedData?.map((appointment)=>{ 
  return <tr key={appointment.id} className='  transition duration-200 hover:bg-slate-50  border-b border-gray-200/70' >
    
  <td className=" text-[#0F172B] text-[10px] md:text-[18px]  font-bold py-5  text-center md:px-6 ">{appointment.patientName}</td>
    
  <td className=" text-[#0F172B] text-[10px] md:text-[18px]  font-medium py-5  text-center md:px-6">{appointment.date}</td>
  <td className=" text-[#45556C] text-[10px] md:text-[18px]  text-center py-5  md:px-6">{new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
  <td className=" text-[#45556C] text-[10px] md:text-[18px] text-center py-5  md:px-6">{appointment.procedure}</td>
  <td className=" py-5 px-2  md:px-6 text-center">
<span  className={` whitespace-nowrap px-2 text-[11px] py-0.5 font-bold shadow-md rounded-full outline-none ${
  appointment.status === 'مكتمل' ? 'bg-[#ecfdf5] text-[#007A55]' :
  appointment.status === 'في الانتظار' ? 'bg-[#fffbeb] text-[#BB4D00]' :
  'bg-[#f8fafc] text-[#45556C]'
}`}>{appointment.status}</span>
  </td>
 
</tr>
})
}

  </tbody>
</table>
<PagenationButtons
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  totalPages={totalPages}
  from={from}
  to={to}
  total={total}
  unitName="موعد"
/>
  </div>

  </div>
    </div>)
}

