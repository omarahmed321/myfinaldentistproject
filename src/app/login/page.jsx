import React from 'react';
import LoginBox from './LoginBox';
import TitleAndLogo from '@/components/TitleAndLogo';

export default async function page() {
  return (
    <div className=" w-full min-h-dvh bg-[#F8FAFC] ">
      <main className=" w-full md:w-[80%] lg:w-2/5 mx-auto h-full py-42.5 text-center flex flex-col items-center gap-5">
        {/* title and Logo */}
        <TitleAndLogo />

        {/* just 1 p  */}
        <p className=" text-[#64748B] text-[16px]">
          نظام الاداره الذكي-تسجيل الدخول
        </p>

        {/* the main login div */}
        <div className="login p-10 rounded-xl bg-white border border-[#E2E8F0] shadow-md text-end w-[90%] mx-auto md:w-[70%]">
          <p className="font-bold text-[20px] md:text-[24px] text-[#111827]">
            مرحباً بك مجدداً
          </p>
          <p className="text-[14px] text-[#64748B]">
            يرجى إدخال بياناتك للوصول إلى لوحة التحكم
          </p>
          {/* the fields are in another component cuz they use useformik/<Formik></Formik> */}
          <LoginBox />
          {/* description */}
          <p className="text-[12px]  text-[#94A3B8] text-center h-10 flex flex-col justify-end border-t border-[#F1F5F9] ">
            © 2024 نظام إدارة عيادة الأسنان - الإصدار 1.0.0
          </p>
        </div>
      </main>
    </div>
  );
}
