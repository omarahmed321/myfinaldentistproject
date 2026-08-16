import React from 'react'

export default function page() {
let todayNumber = new Date().toLocaleDateString('en-US', { day: '2-digit' });

  return (







    <div className=' w-full h-full p-8 '>



  <div className=' w-full h-full    '>
<div className="upper w-full" dir='rtl'>
  <p className='  text-[#314158] font-bold mb-6'>اختر التاريخ</p>
  <div className="filterByDaysBox flex gap-3">
    <button className=' p-4.5 flex flex-col gap-1'>السبت
      {}
    </button>
    <button></button>
    <button></button>
    <button></button>
    <button></button>
    <button></button>
    <button></button>
  </div>
</div>





    </div>


    </div>
  )
}
