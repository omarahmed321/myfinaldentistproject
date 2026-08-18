'use client'
import { ArrowRight, NotepadText } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import Skeleton from '../../../components/Skeletron'

 function AddPatient() {
 // lol مفكر انه لما يسميها searchparas كده معرفتش يعني يوجع 
  let theParamId = useSearchParams().get('id')
  const router = useRouter()
  let PhoneInput =useRef()
  let ageInput =useRef()
  let nameInput =useRef()
  let noteInput =useRef()
let maleInput = useRef()
let femaleInput = useRef()
useEffect(() => {
  if (theParamId) {
    let isTherePatients = localStorage.getItem('data')
    let patients = isTherePatients ? JSON.parse(isTherePatients) : []
    let oldPatient = patients.find((patient) => patient.id == theParamId)

    if (oldPatient) {
      nameInput.current.value = oldPatient.name || ''
      PhoneInput.current.value = oldPatient.phone || ''
      ageInput.current.value = oldPatient.age || ''
      noteInput.current.value =oldPatient.note || ''
   if (maleInput.current && femaleInput.current) {
        maleInput.current.checked = oldPatient.gender === 'ذكر'
        femaleInput.current.checked = oldPatient.gender === 'أنثى'
      }
    }
  }
  else{
    nameInput.current.value = ''
    PhoneInput.current.value =''
    ageInput.current.value ='' 
    noteInput.current.value =''
  if (maleInput.current) maleInput.current.checked = false 
    if (femaleInput.current) femaleInput.current.checked = false

  }
}, [theParamId])






let statusInput = useRef()


let validatePatientInputs = () => {
  let name = nameInput.current?.value?.trim();
  let phone = PhoneInput.current?.value?.trim();
  let age = ageInput.current?.value?.trim();
  let genderValue = maleInput.current?.checked ? 'ذكر' : femaleInput.current?.checked ? 'أنثى' : '';
  if (!name) {
    toast.error("يرجى إدخال اسم المريض بالكامل!");
    return false;
  }
  if (!phone || phone.length < 11) {
    toast.error("يرجى إدخال رقم هاتف صحيح (11 رقم)!");
    return false;
  }
  if (!age || isNaN(age) || age < 1 || age > 120) {
    toast.error("يرجى إدخال سن صحيح للمريض!");
    return false;
  }
  if (!genderValue) {
    toast.error("يرجى تحديد جنس المريض (ذكر / أنثى)!");
    return false;
  }
  return true;
}

  let handleAddPatient =()=>{
      if (!validatePatientInputs()) return;
  let isTherePatients = localStorage.getItem('data')
    let patients = isTherePatients ? JSON.parse(isTherePatients) : []
    let genderValue = maleInput.current.checked ? 'ذكر' : femaleInput.current.checked ? 'أنثى' : ''
    // بنجيب القديم عشان نعدله لو فيه اصلا
    if(theParamId){
patients =patients.map((patient)=>{ if(patient.id == theParamId){

  return {
    ...patient,
    name:nameInput.current.value,
    phone:PhoneInput.current.value,
    age:ageInput.current.value,
    note : noteInput.current.value,
    gender: genderValue,
    status: statusInput.current.value

  }
 
}
 else{
    return patient
      
    
  }

})
    
  




  }
  else {
  // المفروض الفانكشن كانت دي بس لول يلا بقي جت من عند ربنا
    let newPatient = {
      id: crypto.randomUUID(),
      name: nameInput.current.value,
      phone: PhoneInput.current.value,
      age: ageInput.current.value,
      note : noteInput.current.value,
      gender : genderValue,
      status: statusInput.current.value
    }
    patients.push(newPatient)
  }
  localStorage.setItem('data', JSON.stringify(patients))
  
  router.push('/patients')
  }
  
  return (
    <div className=' px-4 pt-4 mt-12 lg:mt-0 w-full lg:w-[50%] mx-auto pb-4 '>
      {/* back to Home */}
      <div className="flex w-full items-center justify-end font-semibold gap-1.5 text-[#62748E]  mb-8 ">
       
          <Link href="/patients" className=' text-[14px]  text-start flex gap-1.5 '>   العودة لقائمة المرضى  <ArrowRight className=' text-[14px]' /> </Link>
          
      </div>
     {/* the main div */}
      <main className='w-full md:min-h-0 min-h-dvh  pb-4  border border-[#E2E8F0] shadow-lg bg-white rounded-xl mx-auto px-4 pt-4 md:px-12 md:pt-4 text-end'>
       <p className='text-[24px] text-black font-bold  mb-2'>بيانات المريض</p>
       <p className='text-[16px] text-[#62748E] mb-10'>يرجى إدخال البيانات الأساسية للمريض بدقة لضمان دقة السجلات الطبية.</p>
       {/* inputs and gender checkboxes */}
       <div className="flex flex-col gap-8 ">
        {/* phone number and name inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
             <label htmlFor="" className='text-black text-[14px] font-bold flex flex-col '>
            رقم الهاتف
            <input ref={PhoneInput} inputMode="numeric" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} type="number" className=' [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[#0F172B] mt-2 py-2 px-4 text-[16px] border border-[#E2E8F0] rounded-lg  outline-0 focus:border-black/30' placeholder='01xxxxxxxxx' />
          </label>
          <label htmlFor="" className=' text-black text-[14px] font-bold flex flex-col '>
            الاسم بالكامل
            <input ref={nameInput} type="text" placeholder='مثال: محمد أحمد علي' className=' text-[#0F172B] mt-2 py-2 px-4 text-[16px] border border-[#E2E8F0] rounded-lg text-end outline-0 focus:border-black/30'/>
          </label>
       
        </div>
        {/* age and gender */}


<label className="text-black text-[14px] font-bold flex flex-col">
  حالة المريض
  <select 
    ref={statusInput} 
    className="text-[#0F172B] mt-2 py-2 px-4 text-[16px] border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] outline-0 focus:border-black/30"
  >
    <option value="جديد">جديد</option>
    <option value="منتظم">منتظم</option>
    <option value="يحتاج متابعه">يحتاج متابعه</option>
  </select>
</label>

        <div className="md:grid flex flex-col-reverse md:grid-cols-2 gap-6 ">


{/* gender checkboxes */}

<div className=' text-[14px] font-bold text-black text-end flex flex-col '>
  الجنس
  <div className="checkboxes flex justify-end mt-5 gap-6  ">
      <label htmlFor="" className='flex gap-1.5 text-[14px] font-medium text-[#314158] items-center '>انثي<input ref={femaleInput} type="radio" name='gender' id='female'  className=' rounded-full appearance-none w-4 h-4 transition border duration-200 border-gray-300 checked:border-[#0D9488] checked:bg-[#0D9488]  outline-0 bg-white cursor-pointer' /></label>
  <label htmlFor="" className='flex gap-1.5 text-[14px] font-medium text-[#314158] items-center'>ذكر<input ref={maleInput} type="radio" name='gender' id='male' className=' rounded-full appearance-none w-4 h-4 border transition duration-200 border-gray-300 checked:border-[#0D9488] checked:bg-[#0D9488] outline-0 bg-white cursor-pointer'/></label>
  </div>

</div>

{/* age input */}
           <label htmlFor="" className='text-black text-[14px] font-bold flex flex-col '>
           السن
            <input ref={ageInput} inputMode="numeric"  onInput={(e) => {
  
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }}  dir='rtl'  type="text" className=' text-[#0F172B] mt-2 py-2 px-4 text-[16px] border border-[#E2E8F0] rounded-lg  outline-0 focus:border-black/30   text-right' placeholder='مثال:25' />
          </label>


        </div>


       </div>
     <label htmlFor="" className='ملاحظات طبية (اختياري) text-[14px] font-bold text-[#314158] gap-2 flex flex-col w-full mt-8'>
      ملاحظات طبية (اختياري)
      <textarea ref={noteInput} name="" id="" className=' resize-none font-normal text-[16px] text-[#0F172B] pt-3 px-4 text-right outline-0 rounded-lg border h-30 border-[#E2E8F0] focus:border-black/30' placeholder='أي ملاحظات حول الحالة الصحية، الحساسية، أو التاريخ الطبي...'></textarea>
     </label>

     <div className='mt-8 w-full border-t border-[#F1F5F9] gap-4 md:flex md:flex-row  flex flex-col-reverse   '>
<button onClick={handleAddPatient}  className=' cursor-pointer hover:transition-transform hover:scale-105 md:mt-8 text-[14px] font-bold text-white py-3 px-14 bg-[#0D9488] rounded-lg'>حفظ المريض</button>
<Link href='/patients' className=' cursor-pointer hover:transition-transform hover:scale-105 md:mt-8 text-[14px] font-bold text-[#45556C]  rounded-lg border border-[#E2E8F0] py-3 px-10 text-center  '  >إلغاء</Link>
     </div>
      </main>
      
  
    </div>
  )

}

export default function SuspenseFunction(){
return (
  <Suspense  fallback={<Skeleton />}>
      <AddPatient />
    </Suspense>
)


}