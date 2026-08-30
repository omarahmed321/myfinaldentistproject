'use client';
import React, { useEffect, useState } from 'react';
import {  readCurrentUser } from '@/utils/storage';
import TitleAndLogo from '@/components/TitleAndLogo.jsx';
import {
  Calendar,
  ChartColumn,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearCurrentUser } from '@/utils/storage.js';
import Skeleton from '@/components/Skeletron';
export default function SideBar({ modal, setModal }) {
  /////////////////////////// hooks
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const pathName = usePathname();
  /////////////////////////// styles
  let optionElse =
    'hover:bg-[#0D9488]/5 hover:text-[#0D9488]/50 transition rounded-xl ';
  let optionClassname = ` flex w-fit ml-auto py-2.5 `;
  /////////////////////////// handle sign out
  let handleSignOut = () => {
    document.cookie = 'token=;path=/;max-age=0';
    // امسح الاوبجكت بتاع الدكتور
    clearCurrentUser();
    setModal(false);
    router.push('/login');
  };
  /////////////////////////// useEffect
  useEffect(() => {
    setCurrentUser(readCurrentUser())
    modal
      ? ((document.body.style.overflow = 'hidden'),
        (document.documentElement.style.overflow = 'hidden'))
      : ((document.body.style.overflow = 'unset'),
        (document.documentElement.style.overflow = 'unset'));
  }, [modal]);



if (!currentUser)
  return (
    <div className="hidden lg:block lg:w-[13%] min-h-dvh  shrink-0 p-3">
      <Skeleton className="w-full "  />
    </div>
  );

  return (
    <>
      <div
        className={`  min-h-dvh  ${modal ? '   translate-x-0  ' : 'translate-x-full'}  lg:translate-x-0 right-0 fixed top-0 lg:static  lg:flex flex-col w-[60%] md:w-[27%] lg:w-[13%] ml-auto   bg-[#1D293D] transition duration-500 z-50 lg:z-0  `}
      >
        {/* Title and Logo */}
        <button
          className=" lg:hidden ml-4 mt-2 "
          onClick={() => {
            setModal(false);
          }}
        >
          <X className=" text-white" />
        </button>
        <div className="TitleandLogo lg:pt-3  pb-3  border-b border-[#0F172A]">
          <div className="titleAndLogo flex gap-3 mx-auto items-center w-fit ">
            <h1 className=" text-white font-bold md:text-[18px] lg:text-[18px] text-[18px] ">
              عيادة {currentUser?.clinicName}
            </h1>
            <div className="logo bg-[#0D9488] rounded-xl md:h-8 md:w-8 lg:h-8 h-8 w-8 lg:w-8 flex justify-center items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 2v2" />
                <path d="M5 2v2" />
                <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                <path d="M8 15a6 6 0 0 0 12 0v-3" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </div>
          </div>
          {/* the main options
           */}
        </div>
        <div className="options flex flex-col pr-8 mt-6.5 justify-center gap-1">
          <div
            className={` hover:transition-transform hover:scale-105 pr-3 ml-3 ${pathName == '/' ? ' transition duration-300 text-[#0D9488] bg-[#0D9488]/10 rounded-xl ' : optionElse}`}
          >
            <Link
              href="/"
              onClick={() => {
                setModal(false);
              }}
              className={
                optionClassname +
                `${pathName == '/' ? 'text-[#0D9488]' : 'text-[#CAD5E2]'}`
              }
            >
              لوحة التحكم{' '}
              <LayoutDashboard
                className={`ml-2 ${pathName == '/' ? 'text-[#0D9488] ' : ''}`}
              />
            </Link>
          </div>
          <div
            className={` hover:transition-transform hover:scale-105 pr-3 ml-3 ${pathName == '/patients' ? 'transition duration-300 text-[#0D9488] bg-[#0D9488]/10 rounded-xl ' : optionElse}`}
          >
            <Link
              href="/patients"
              onClick={() => {
                setModal(false);
              }}
              className={
                optionClassname +
                `${pathName == '/patients' ? 'text-[#0D9488]' : 'text-[#CAD5E2]'}`
              }
            >
              المرضى{' '}
              <Users
                className={`ml-2 ${pathName == '/patients' ? 'text-[#0D9488] ' : ''}`}
              />
            </Link>
          </div>
          <div
            className={` hover:transition-transform hover:scale-105 pr-3 ml-3 ${pathName == '/appointments' ? ' transition duration-300 text-[#0D9488] bg-[#0D9488]/10 rounded-xl ' : optionElse}`}
          >
            <Link
              href="/appointments"
              onClick={() => {
                setModal(false);
              }}
              className={
                optionClassname +
                `${pathName == '/appointments' ? 'text-[#0D9488]' : 'text-[#CAD5E2]'}`
              }
            >
              المواعيد{' '}
              <Calendar
                className={`ml-2 ${pathName == '/appointments' ? 'text-[#0D9488] ' : ''}`}
              />
            </Link>
          </div>
        </div>
        {/*settings option   */}
        <div className="hover w-full   hover:rounded-2xl border-t border-[#0F172A] absolute lg:mt-auto bottom-0 right-0 p-3 ">
          <div
            className=" text-white settings  flex  w-full transition duration-500  rounded-xl hover:bg-red-500/10 p-3  hover:text-red-500  cursor-pointer  "
            onClick={handleSignOut}
          >
            تسجيل الخروج <LogOut className="ml-2 text-white  " />
          </div>
        </div>
      </div>
      {/* the menu that opens the modal */}

      {/* overlay */}
      <div
        onClick={() => {
          setModal(false);
        }}
        className={`Overlay fixed inset-0  z-20 bg-black/30 lg:hidden blur-xs ${modal ? 'block' : 'hidden'}`}
      ></div>
    </>
  );
}
