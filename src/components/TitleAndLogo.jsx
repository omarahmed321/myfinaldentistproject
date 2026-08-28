import { Stethoscope } from 'lucide-react';
import React from 'react';

export default function TitleAndLogo() {
  return (
    <div className="titleAndLogo flex gap-3   ">
      <h1 className=" text-[#111827] font-bold md:text-[30px] lg:text-[36px] text-[24px] whitespace-nowrap ">
        سستم  عيادة
      </h1>
      <div className="shadow-md logo bg-[#0D9488] text-white rounded-xl lg:h-12 h-10 w-10 lg:w-12 flex justify-center items-center">
        <Stethoscope color="white" className="w-6 h-6" />
      </div>
    </div>
  );
}
