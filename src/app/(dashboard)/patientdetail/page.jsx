
'use client'

import { AlertCircle, Info, Phone, PlusCircle, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "../../../components/Skeletron";




 function PatientDetail() {
  // some useState
  const [appointments, setAppointments] = useState([]);
  const [theRequiredPatient , setTheRequiredPatient]=useState()
  const [theRequiredAppointmentPerPerson , setTheRequiredAppointmentPerPerson] = useState()
  const [timeValue, setTimeValue] = useState("");
  // some hooks
  const router = useRouter()
  const paramsID= useSearchParams().get('id')

  // inputs Refrence
  const dateInput = useRef();
const timeInput = useRef();
const operation = useRef();
const statusOption =useRef()
// function that reads from the local
  let readAppointmentsFromLocalStorage = () => {
  let isAppointments = localStorage.getItem('appointments');
  return isAppointments ? JSON.parse(isAppointments) : [];
}
// function saves the data
let saveAppointmentsAndSync = (newAppointments) => {
  localStorage.setItem('appointments', JSON.stringify(newAppointments));
  setAppointments(newAppointments);
  setTheRequiredAppointmentPerPerson(newAppointments.filter((app) => app.patientId === paramsID));
}

let handleEdit =()=>{
router.push(`/addpatient?id=${theRequiredPatient.id}`)
}



// handle the add new appointment
let handleNewAppointment =()=>{
    if (!dateInput.current?.value || !timeInput.current?.value || !operation.current?.value) {
    toast.error("! انت ليه سايب اماكن فاضيه ");
    return;
  }
  let newAppointment ={
    id: crypto.randomUUID(),
    patientId : theRequiredPatient.id,
    patientName : theRequiredPatient.name,
    status:"مكتمل",
    time:timeInput.current.value,
    date:dateInput.current.value,
    procedure : operation.current.value

  }
let allAppointments = readAppointmentsFromLocalStorage()
allAppointments.push(newAppointment);

saveAppointmentsAndSync(allAppointments)
  timeInput.current.value = ''
  dateInput.current.value = ''
  operation.current.value = ''
    toast.success('تم اضافه موعد جديد')
}


// nah thats the use effect
  useEffect(()=>{
  // reading the data from localstorage and getting the required patient
  if(!paramsID){router.push('/patients')
    return ;
  }
  let isPatients = localStorage.getItem('data')
  let patients =  isPatients? JSON.parse(isPatients) : []
  setTheRequiredPatient(patients.find((patient)=>{return patient.id === paramsID}))

  // reading appointments data from the localStorage if there is 
let allAppointments = readAppointmentsFromLocalStorage()
saveAppointmentsAndSync(allAppointments)
    
  },[paramsID])

// handle delete
let handleDeleteAppointment =(appointment)=>{
let allAppointments = readAppointmentsFromLocalStorage()
let filteredAppointments = allAppointments.filter((appointments)=>{return appointment.id !== appointments.id })
saveAppointmentsAndSync(filteredAppointments)


}
// handle change Status
let handleChangeStatus =(appointment,newStatus)=>{
let allAppointments = readAppointmentsFromLocalStorage();
let updatedAppointmentsAfterNewStatus = allAppointments.map((appointmentInLoop)=>{
  return appointment.id === appointmentInLoop.id ? { ...appointmentInLoop, status: newStatus } : appointmentInLoop;
})
saveAppointmentsAndSync(updatedAppointmentsAfterNewStatus);
}



  return (
    <div className=" md:px-5 md:py-5  py-10 px-4 w-full h-full flex flex-col gap-6 lg:gap-8" >
      {/* upper */}
<div className="upper p-3 md:p-6.25 w-full flex-col h-auto md:h-46.5 bg-white rounded-xl shadow-md border-[#E2E8F0] border gap-3 flex md:flex-row-reverse">
<div className="right md:w-3/4 w-full  md:flex-row lg:w-[36%] h-full ml-auto flex justify-end text-right gap-5">
      <div className="innerLeft flex flex-col gap-1 w-full items-end">
        {/* NAME */}
      <span className=" text-[24px] font-bold text-[#0F172B]">{theRequiredPatient?.name}</span>
      {/* info phonenumber / gender */}
      <div className=" info flex gap-4 ">
        <span dir="rtl" className="Age flex gap-2 text-[14px] text-[#62748E] items-center   ">
            <Info className=" text-[#90A1B9] w-5 h-5" />
{theRequiredPatient?.age} سنه 
( {theRequiredPatient?.gender} )

</span>
<span className="PhoneNumber flex gap-2 text-[14px] text-[#62748E] items-center">
  {theRequiredPatient?.phone} <Phone className=" text-[#90A1B9] w-4 h-4" />
</span>



      </div>


      {/* notes */}
      <div className=" flex  notes w-full h-full pr-4 pt-2 bg-[#FDF1F1] border rounded-lg border-[#FFE2E2] text-[#E7000B] relative flex-col ">
<span className="text-[#C10007] text-[16px] font-bold  flex gap-3 w-full justify-end ">ملاحظات طبية هامة <AlertCircle className=" text-[#FB2C36] h-5 w-5" /></span>
<span className="w-full pr-8 ">{theRequiredPatient?.note}</span>
      </div>
    </div>
   


       <p  className='  whitespace-nowrap text-[#45556C] bg-[#F1F5F9]  flex-row md:text-[15px] font-bold w-13 h-13   rounded-full flex  justify-center items-center text-center text-[16px]  '>
{
(() => {
    let nameParts = theRequiredPatient?.name ? theRequiredPatient?.name.trim().split(' ') : [];
      let firstChar = nameParts[0] ? nameParts[0][0] : '';
      let secondChar = nameParts[1] ? nameParts[1][0] : '';
      return `${firstChar} ${secondChar}`;

    
    })()
}
              </p>
    

   

   
  

</div>
<button className=" font-bold text-[14px] text-[#45556C] py-2 px-4 rounded-lg border border-[#E2E8F0] h-fit hover:bg-black/5 transition duration-300 hover:border-black/20" onClick={handleEdit}>تعديل البيانات</button>
</div>

{/* appointments and add new appointment */}
<div className="flex w-full shadow-lg  justify-end gap-6 lg:gap-8 flex-col-reverse lg:flex-row ">
   
<div className="md:w-full lg:w-1/3    bg-white shadow-md rounded-xl p-5 gap-6 flex-col" dir="rtl">
<span className=" flex gap-2 items-center font-bold text-[18px] text-[#0F172B]"><PlusCircle className="text-[#0D9488]" /> حجز ميعاد جديد</span>
<div className="inputs flex flex-col gap-4 mt-6">

<label htmlFor="" className=" text-[#314158] flex flex-col font-bold text-[14px] gap-1">
  تاريخ الموعد
  <input ref={dateInput} type="date" className="py-2.5 bg-[#F8FAFC] font-normal text-[#0F172B] px-4 outline-0 border rounded-lg border-[#E2E8F0] focus:border-black/30" />
</label>
<label htmlFor="" className=" text-[#314158] flex flex-col font-bold text-[14px] gap-1">
  الوقت
  <input type="time"  ref={timeInput}   value={timeValue}   onChange={(e) => setTimeValue(e.target.value)} className="py-2.5 bg-[#F8FAFC] font-normal text-[#0F172B] px-4 outline-0 border rounded-lg border-[#E2E8F0] focus:border-black/30"/>
  { !timeValue.trim() ? (
    <span></span>
  ) : appointments.some((app) => app.time === timeValue) ? (
    <span className="text-red-500 font-normal">الموعد محجوز لمريض آخر</span>
  ) : (
    <span className="text-[#00A63E] font-normal">هذا الموعد متاح ولا يوجد تعارض</span>
  )
  }

</label>
<label htmlFor="" className=" text-[#314158] flex flex-col font-bold text-[14px] gap-1">
  نوع الإجراء
  <input required={true} type="text" ref={operation} className="py-2.5 bg-[#F8FAFC] font-normal text-[#0F172B] px-4 outline-0 border rounded-lg border-[#E2E8F0] focus:border-black/30"/>
</label>

<button className=" justify-center hover:shadow-md hover:scale-102 duration-300 transition  flex text-[16px] font-bold text-white bg-[#0D9488] rounded-lg py-3" onClick={handleNewAppointment}>تأكيد الحجز</button>
</div>
</div>


  <div className="appointmentsTable md:w-full   lg:w-2/3 overflow-auto overflow-y-auto max-h-100 ">
 
    <table dir="rtl" className="bg-white shadow-lg w-full  overflow-auto     border border-[#E2E8F0] rounded-xl text-right ">
 <thead className="">
    <tr dir="rtl" className="  text-right"><td className=" text-[#0F172B] whitespace-nowrap font-bold py-4 pr-3 z-10 bg-white ">سجل المواعيد</td></tr>
    <tr className="bg-[#fbfcfd] text-[#62748E] font-medium ">
      <td className="py-4 px-2  text-center  md:px-6">التاريخ</td>
      <td className="py-4 px-2 text-center md:px-6">الوقت</td>
      <td className="py-4 px-2 text-center md:px-6">الاجراء</td>
      <td className="py-4  px-2 text-center md:px-6">الحاله</td>
      <td className=" px-6 py-4 text-center md:px-6"></td>
    </tr>
  </thead>
  <tbody>
{
theRequiredAppointmentPerPerson?.map((appointment)=>{
  return <tr key={appointment.id} className="transition duration-200 hover:bg-slate-50  border-b border-gray-200/70">
  <td className=" text-[#0F172B] text-[10px] md:text-[18px]  font-medium py-5  text-center md:px-6">{appointment.date}</td>
  <td className=" text-[#45556C] text-[10px] md:text-[18px]  text-center py-5  md:px-6">{new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
  <td className=" text-[#45556C] text-[10px] md:text-[18px] text-center py-5  md:px-6">{appointment.procedure}</td>
  <td className=" py-5 px-2  md:px-6 text-center">
  <select value={appointment.status || "مجدول"} ref={statusOption}   onChange={(e) => handleChangeStatus(appointment, e.target.value)}
  className={`px-2 text-[11px] py-0.5 font-bold shadow-md rounded-full outline-none ${
  appointment.status === 'مكتمل' ? 'bg-[#ecfdf5] text-[#007A55]' :
  appointment.status === 'في الانتظار' ? 'bg-[#fffbeb] text-[#BB4D00]' :
  'bg-[#f8fafc] text-[#45556C]'
}`}>
  <option value="مجدول" >مجدول</option>
  <option value="في الانتظار">انتظار</option>
  <option value="مكتمل"  className=" ">مكتمل</option>
</select>
  </td>
  <td className="   ">
    <Trash className="text-[#90A1B9] hover:text-red-700 transition duration-300 " onClick={()=>handleDeleteAppointment(appointment)}  />
  </td>
</tr>
})
}

  </tbody>
</table>
  </div>

</div>


    </div>
  )
}
export default function SuspenseAddPatient() {
  return (
    <Suspense  fallback={<Skeleton />} >
      <PatientDetail />
    </Suspense>
  )
}