'use client'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { resolve } from 'path'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import * as Yup from 'yup'

export default  function LoginBox() {
    const router = useRouter();
    const [showPass,setShowPass] = useState(false)
   
    let validationSchemaWithYup = Yup.object().shape({
        username:Yup.string().min(3,'اقل حاجه 3 حروف').max(30,'اكتر حاجه 30 حرف').required('اسم المستخدم لازم ينكتب').matches( /^[a-zA-Z0-9\u0600-\u06FF]+(?:[ _-][a-zA-Z0-9\u0600-\u06FF]+)*$/, `متستعملش رموز غريبه زي ( ' , " , -- , ; )`),
        password:Yup.string().min(8,'اقل حاجه 8 حروف').required('كلمه السر مطلوبه').matches( /^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_-]).{8,64}$/,'كلمه السر لازم يكون فيها رمز مميز زي الشباك ومعاه رقم ومعاه حرف كابيتال وواحد سمول ومنغير مسافات'

        ),
        remember: Yup.boolean()
    })
    let mySchemaInitialValues={
        username:'',
        password:'',
        remember:false

    }
    let handleSubmit =async(values,{setSubmitting,setFieldError})=>{
       
        if(values.username === 'omar' && values.password === "Omar123*#"){
            const fakeToken = 'dummy-jwt-token-12345'
        //          if(values.remember){
        //     localStorage.setItem('token',fakeToken)
        // }else{
           
        //     sessionStorage.setItem('token',fakeToken)
        // }
        const maxage = values.remember? 604801 : ''; 
            document.cookie=`token=${fakeToken}; path=/; max-age=${maxage};SameSite=Lax`
        
        toast.success("تم تسجيل الدخول بنجاح")
      

   window.location.href = '/'

        }
        else{
            setFieldError('password', 'اسم المستخدم أو كلمة المرور غير صحيحة');
toast.error('كلمه السر او اليوزر خاطئ')
        }
      
   
    }
  return (
<Formik initialValues={mySchemaInitialValues} validationSchema={validationSchemaWithYup} onSubmit={handleSubmit}  >
   
    <Form >
        {/* Toaster  */}
         <Toaster 
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                style: {
                    fontFamily: 'inherit',
                    borderRadius: '8px',
                },
            }}
        />
          {/* username input */}
    <div className="userName flex flex-col mt-8 mb-6">
<label htmlFor="" className=' text-[14px] font-[semibold text-[#374151] mb-2'>اسم المستخدم</label>
<div className="inputWithIcon w-full relative ">
<svg className=' absolute right-0 -translate-1/2 top-1/2 text-gray-400 ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <Field name="username" type="text" className='outline-none focus:border-black/40 transition w-full text-[16px] text-[#111827] border border-[#E2E8F0] rounded-lg py-2.5 pr-10 pl-2 p text-end' placeholder='أدخل اسم المستخدم' />
    
</div>
<ErrorMessage name="username" component="p" className="text-red-500 text-xs mt-1" />

    </div>
    {/* password input */}
    <div className="password flex flex-col mt-8 mb-6">
<label htmlFor="" className=' text-[14px] font-[semibold text-[#374151] mb-2'>كلمة المرور</label>

<div className="inputWithIcon w-full relative ">
    <button type='button'  onClick={()=>{setShowPass(!showPass)}}>{showPass? <Eye className=' absolute left-5  text-gray-400  top-1/2 -translate-1/2'/>:<EyeOff className=' absolute left-5  text-gray-400  top-1/2 -translate-1/2' />}</button>

<svg xmlns="http://www.w3.org/2000/svg" className=' text-gray-400 absolute top-1/2 -translate-1/2 right-0'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    <Field type={showPass? 'text': 'password'} name="password" className= {`outline-none focus:border-black/40 transition w-full text-[16px] text-[#111827] border border-[#E2E8F0] rounded-lg py-2.5 pr-10 pl-2 p text-end ${showPass? '': 'tracking-[0.2em] font-mono'}`} placeholder='••••••••' />
   
</div>
 <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
    </div>
    {/* remember me and forgot password */}
    <div className="rememberMe flex justify-between mb-6">
        {/* forgot password */}
       <Link href="/" className=' text-[14px] text-[#0D9488] font-semibold'>نسيت كلمة المرور؟</Link>
       {/* remember me  */}
       <div className=' w-fit gap-2 flex'>
        <label htmlFor="" className='text-[14px] text-[#4B5563] '>تذكرني</label>
        <Field name="remember" type="checkbox"  className='border border-[#767676]'/>
       </div>
    </div>
    {/* enter the system */}
    <button type='submit'  className=' text-[16px]  justify-center font-bold text-white bg-[#0D9488] px-3 flex py-3 w-full rounded-lg mb-8'>دخول النظام</button>
    </Form>
     
</Formik>
  )
}
