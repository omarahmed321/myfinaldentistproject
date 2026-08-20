'use client'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { readAppointmentsFromLocalStorage } from '../../../utils/storage';
import { useRouter } from 'next/navigation';

export default function page() {
  /////////////////////////// just some repeatedStyles
 let filterButtonStyle =
    "w-full md:w-1/4  px-3  font-md rounded-lg  text-center     ";
  /////////////////////////// just to get the todays Number
let todayNumber = new Date().toLocaleDateString('en-US', { day: '2-digit' });
  /////////////////////////// the hooks
const router = useRouter()
const [appointmentStatus,setAppointmentStatus] =useState('الكل')
const [appointments,setAppointments] =useState()
const [selectedDayDate, setSelectedDayDate] = useState(null);
// دي بتخزن الاسابيع
const [weekStartDate, setWeekStartDate] = useState(() => {
  let today = new Date();
  let dayIndex = today.getDay();
  let distToSat = (dayIndex + 1) % 7;
  let sat = new Date(today);
  sat.setDate(today.getDate() - distToSat);
  return sat;
});

  /////////////////////////// handleNextWeek
let handleNextWeek = () => {
  let nextSat = new Date(weekStartDate);
  nextSat.setDate(weekStartDate.getDate() + 7);
  setWeekStartDate(nextSat);
   setSelectedDayDate(null);
};

  /////////////////////////// handlePrevWeek
let handlePrevWeek = () => {
  let prevSat = new Date(weekStartDate);
  prevSat.setDate(weekStartDate.getDate() - 7);
  setWeekStartDate(prevSat);
   setSelectedDayDate(null);
};
  /////////////////////////// currentWeekDays
let currentWeekDays = Array.from({ length: 7 }, (_, i) => {
  let d = new Date(weekStartDate);
  d.setDate(weekStartDate.getDate() + i);
  return {
    fullDate: d.toISOString().split('T')[0],
    dayName: d.toLocaleDateString('ar-EG', { weekday: 'long' }), 
    dayNumber: d.toLocaleDateString('en-US', { day: '2-digit' }) 
  };
});


  /////////////////////////// appointmentsThisWeek
let appointmentsThisWeek = (appointments || []).filter((appointment) => {
    if (selectedDayDate) {
    return appointment.date === selectedDayDate;
  }
  return currentWeekDays.some((day) => day.fullDate === appointment.date);
});
  /////////////////////////// filter buttons in the appointments this week
let filteredAppointmentsThisWeek = appointmentsThisWeek.filter((appointment)=>{

    if (appointmentStatus === 'الكل') return true; 
  return appointment.status === appointmentStatus;
}

  
)
  /////////////////////////// useEffect 
useEffect(()=>{
   setAppointments(readAppointmentsFromLocalStorage())
},[])
  /////////////////////////// handle edit
let handleEdit =(appointmentPatientId)=>{
router.push(`/patientdetail?id=${appointmentPatientId}`)
}

  return (







    <div className=' w-full h-full p-8 '>



 
<div className="upper w-full" dir='rtl'>
<div className="up w-full  flex flex-col md:flex-row justify-between  items-start gap-2 md:gap-0 mb-6">  <p className='  text-[#314158] font-bold  lg:text-[20px] text-[16px] '>اختر التاريخ</p>
<div className="slider flex gap-2 text-black items-center   ">
  <button className=' p-1 bg-white border  border-gray-300  rounded-lg text-[#45556C]' onClick={handlePrevWeek}><ChevronRight /></button>
<span>{weekStartDate.toISOString().split('T')[0]}</span> 
  <button className=' p-1 bg-white border  border-gray-300  rounded-lg text-[#45556C]' onClick={handleNextWeek}><ChevronLeft /></button>
</div>


</div>
  <div className="filterByDaysBox flex gap-1 md:gap-3  overflow-x-auto w-full mb-6">
{currentWeekDays.map((day)=>{
  let isSelected = selectedDayDate === day.fullDate;
 return <button  onClick={() => setSelectedDayDate(isSelected ? null : day.fullDate)} key={day.fullDate} className={`px-4 py-3 flex flex-col gap-1 border border-gray-300 hover:shadow-md hover:border-0 transition duration-100 hover:transition-transform hover:scale-102  rounded-xl  ${isSelected? ' border-0 transition-transform scale-105 bg-[#ecf5f6] text-[#0D9488] shadow-lg ': 'text-[#62748E] bg-white '}`} >{day.dayName}
     <span className={`${isSelected? 'text-[#139C89]':'text-[#0F172B]'} font-bold`}> {day.dayNumber}</span>
     {
     day.fullDate === new Date().toISOString().split('T')[0]? <span className=' text-[13px' >
اليوم
     </span> : <span></span>
     }
    </button>
 
})}
   
  </div>


  {/* filter buttons  */}
  <div className="buttons border border-[#E2E8F0] md:flex md:flex-row bg-white rounded-lg h-13 shadow-md w-full md:w-fit flex py-1 relative gap-1 px-2">
  <div className={`absolute w-1/4 transition-all duration-300 ease-in-out m-1 ml-3 top-1 rounded-lg h-9 bg-[#e7f5f4] font-bold ${
    appointmentStatus === 'مكتمل' ?  'right-0' :
    appointmentStatus === 'في الانتظار' ?   'right-[25%]':
    appointmentStatus === 'مجدول' ?'right-[47%]' :
    'right-[72%]'
  }`}>
  </div>
  <button onClick={() => setAppointmentStatus('مكتمل')} className={`z-10 ${filterButtonStyle} ${appointmentStatus === 'مكتمل' ? 'text-[#0d9488] font-bold' : 'text-[#45556C]'}`}>مكتمل</button>
  <button onClick={() => setAppointmentStatus('في الانتظار')} className={`whitespace-nowrap z-10 ${filterButtonStyle} ${appointmentStatus === 'في الانتظار' ? 'text-[#0d9488] font-bold' : 'text-[#45556C]'}`}>انتظار</button>
  <button onClick={() => setAppointmentStatus('مجدول')} className={`z-10 ${filterButtonStyle} ${appointmentStatus === 'مجدول' ? 'text-[#0d9488] font-bold' : 'text-[#45556C]'}`}>مجدول</button>
  <button onClick={() => setAppointmentStatus('الكل')} className={`z-10 ${filterButtonStyle} ${appointmentStatus === 'الكل' ? 'text-[#0d9488] font-bold' : 'text-[#45556C]'}`}>الكل</button>
</div>
</div>
{/* table */}
<div className="appointmentsTable mt-6 max-h-[50vh] overflow-auto w-full shadow-md  rounded-xl border border-[#E2E8F0] bg-white">
  <table dir="rtl" className="w-full text-right border-collapse">
    <thead>
      <tr className="bg-[#F8FAFC] text-[#62748E] font-medium border-b border-[#E2E8F0] text-sm">
        <td className="py-4 px-6 text-center font-bold">الوقت</td>
        <td className="py-4 px-6 text-right font-bold">المريض</td>
        <td className="py-4 px-6 text-center font-bold">نوع الإجراء</td>
        <td className="py-4 px-6 text-center font-bold">الحالة</td>
        <td className="py-4 px-6 text-center font-bold">الإجراءات</td>
      </tr>
    </thead>
    <tbody className="divide-y divide-[#F1F5F9] text-sm">
      { filteredAppointmentsThisWeek.map((appointment)=>(  <tr key={appointment.id} className="hover:bg-slate-50 transition">
        <td className="py-4 px-6 text-center font-bold text-[#0F172B]">{new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
        <td className="py-4 px-6 text-right">
          <div className="flex items-center gap-3">
          
            <span className="font-bold text-[#0F172B]">{appointment.patientName}</span>
          </div>
        </td>
        <td className="py-4 px-6 text-center text-[#45556C]">{appointment.procedure}</td>
        <td className="py-4 px-6 text-center">
          <span className={` whitespace-nowrap px-2 text-[11px] py-0.5 font-bold shadow-md rounded-full outline-none ${
  appointment.status === 'مكتمل' ? 'bg-[#ecfdf5] text-[#007A55]' :
  appointment.status === 'في الانتظار' ? 'bg-[#fffbeb] text-[#BB4D00]' :
  'bg-[#f8fafc] text-[#45556C]'
}`}>{appointment.status}</span>
        </td>
        <td className="py-4 px-6 text-center">
          <button className="text-[#90A1B9] duration-200 transition-transform  hover:scale-102 hover:text-gray-500 " onClick={()=>handleEdit(appointment.patientId)}><Eye /></button>
        </td>
      </tr>))

      }
    
    
    </tbody>
  </table>
</div>



   


    </div>
  )
}
