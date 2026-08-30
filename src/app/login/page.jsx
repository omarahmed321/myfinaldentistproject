'use client'
import React from 'react';
import LoginBox from './LoginBox';
import TitleAndLogo from '@/components/TitleAndLogo';
import {signInWithGoogle} from '@/utils/storage';
export default  function page() {
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
                       <button   
  onClick={signInWithGoogle} className="w-full h-12 flex items-center justify-center gap-3 px-4 bg-white border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] active:scale-[0.98] transition-all focus:ring-4 focus:ring-[#f1f5f9] shadow-sm cursor-pointer">
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.17 21.36 7.22 24 12 24z"/>
    <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.39-1.49-.39-2.24s.14-1.52.39-2.24V6.6H1.19C.43 8.14 0 9.89 0 11.8s.43 3.66 1.19 5.2l4.08-2.76z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.64 1.19 6.6l4.08 3.16c.95-2.85 3.6-4.01 6.73-4.01z"/>
  </svg>
  <span className="text-sm font-bold text-[#374151] font-['Cairo']">المتابعة باستخدام Google</span>
</button>
          {/* description */}
          <p className="text-[12px]  text-[#94A3B8] text-center h-10 flex flex-col justify-end border-t border-[#F1F5F9] ">
            © 2024 نظام إدارة عيادة الأسنان - الإصدار 1.0.0
          </p>
        </div>
      </main>
    </div>
  );
}
