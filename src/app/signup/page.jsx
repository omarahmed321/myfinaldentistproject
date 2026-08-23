'use client';
import React from 'react';

import TitleAndLogo from '@/components/TitleAndLogo.jsx';
import SignUpBox from './SignUpBox';
export default function page() {
  return (
    <div className=" bg-[#F8FAFC] w-full h-dvh flex justify-center items-center flex-col gap-4 ">
      <TitleAndLogo />
      <h1 className=" text-[22px] md:text-[26px] text-[#111827] font-bold my-1 md:my-2">
        إنشاء حساب جديد
      </h1>
      <p className=" whitespace-nowrap text-[#64748B] text-[15px] ">
        ابدأ بإدارة عيادتك باحترافية وسهولة اليوم
      </p>
      <main className=" flex flex-col items-center w-[90%] md:w-3/5 lg:w-[30%] p-7   border-[#e2e8f0] rounded-xl border shadow-lg bg-white ">
        <div className=" w-full">
          <SignUpBox />
        </div>
      </main>
    </div>
  );
}
