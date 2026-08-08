import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function addpatient() {
  return (
    <div className=' px-4 pt-4 mt-12 w-full lg:w-[50%] mx-auto pb-4 '>
      {/* back to Home */}
      <div className="flex w-full items-center justify-end font-semibold gap-1.5 text-[#62748E]  mb-8 ">
       
          <Link href="/" className=' text-[14px]  text-start flex gap-1.5 '>   العودة لقائمة المرضى  <ArrowRight className=' text-[14px]' /> </Link>
          
      </div>
     {/* the main div */}
      <main className='w-full md:min-h-0 min-h-dvh pb-4 md:h-160 border border-[#E2E8F0] shadow-lg bg-white rounded-xl mx-auto px-4 pt-4 md:px-12 md:pt-12 text-end'>
       <p className='text-[24px] text-black font-bold  mb-2'>بيانات المريض</p>
       <p className='text-[16px] text-[#62748E] mb-10'>يرجى إدخال البيانات الأساسية للمريض بدقة لضمان دقة السجلات الطبية.</p>
       {/* inputs and gender checkboxes */}
       <div className="flex flex-col gap-8 ">
        {/* phone number and name inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
             <label htmlFor="" className='text-black text-[14px] font-bold flex flex-col '>
            رقم الهاتف
            <input type="text" className=' text-[#0F172B] mt-2 py-2 px-4 text-[16px] border border-[#E2E8F0] rounded-lg  outline-0 focus:border-black/30' placeholder='01xxxxxxxxx' />
          </label>
          <label htmlFor="" className=' text-black text-[14px] font-bold flex flex-col '>
            الاسم بالكامل
            <input type="text" placeholder='مثال: محمد أحمد علي' className=' text-[#0F172B] mt-2 py-2 px-4 text-[16px] border border-[#E2E8F0] rounded-lg text-end outline-0 focus:border-black/30'/>
          </label>
       
        </div>
        {/* age and gender */}




        <div className="md:grid flex flex-col-reverse md:grid-cols-2 gap-6 ">


{/* gender checkboxes */}

<div className=' text-[14px] font-bold text-black text-end flex flex-col '>
  الجنس
  <div className="checkboxes flex justify-end mt-5 gap-6  ">
      <label htmlFor="" className='flex gap-1.5 text-[14px] font-medium text-[#314158] items-center '>انثي<input type="radio" name='gender' id='female'  className=' rounded-full appearance-none w-4 h-4 transition border duration-200 border-gray-300 checked:border-[#0D9488] checked:bg-[#0D9488]  outline-0 bg-white cursor-pointer' /></label>
  <label htmlFor="" className='flex gap-1.5 text-[14px] font-medium text-[#314158] items-center'>ذكر<input type="radio" name='gender' id='male' className=' rounded-full appearance-none w-4 h-4 border transition duration-200 border-gray-300 checked:border-[#0D9488] checked:bg-[#0D9488] outline-0 bg-white cursor-pointer'/></label>
  </div>

</div>

{/* age input */}
           <label htmlFor="" className='text-black text-[14px] font-bold flex flex-col '>
           السن
            <input dir='rtl'  type="number" className=' text-[#0F172B] mt-2 py-2 px-4 text-[16px] border border-[#E2E8F0] rounded-lg  outline-0 focus:border-black/30   text-right' placeholder='مثال:25' />
          </label>


        </div>


       </div>
     <label htmlFor="" className='ملاحظات طبية (اختياري) text-[14px] font-bold text-[#314158] gap-2 flex flex-col w-full mt-8'>
      ملاحظات طبية (اختياري)
      <textarea name="" id="" className=' resize-none font-normal text-[16px] text-[#0F172B] pt-3 px-4 text-right outline-0 rounded-lg border h-30 border-[#E2E8F0] focus:border-black/30' placeholder='أي ملاحظات حول الحالة الصحية، الحساسية، أو التاريخ الطبي...'></textarea>
     </label>

     <div className='mt-8 w-full border-t border-[#F1F5F9] gap-4 md:flex md:flex-row  flex flex-col-reverse   '>
<button className=' cursor-pointer hover:transition-transform hover:scale-105 md:mt-8 text-[14px] font-bold text-white py-3 px-14 bg-[#0D9488] rounded-lg'>حفظ المريض</button>
<button className=' cursor-pointer hover:transition-transform hover:scale-105 md:mt-8 text-[14px] font-bold text-[#45556C]  rounded-lg border border-[#E2E8F0] py-3 px-10 '>إلغاء</button>
     </div>
      </main>
      
  
    </div>
  )
}
