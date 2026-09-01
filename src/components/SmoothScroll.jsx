'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
//    object from the lib 
    const lenis = new Lenis()

//    يعمل انيميشن حسب ال screen hz
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

//   يقفل الفانكشن لو خرجت من الصفحات
    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}