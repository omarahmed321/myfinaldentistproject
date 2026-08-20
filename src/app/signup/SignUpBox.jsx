import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { readUsersFromLocalStorage, saveUsersToLocalStorage ,  saveCurrentUserToLocalStorage } from '@/utils/storage'
export default function SignUpBox() {
 /////////////////////////// hooks
 const router = useRouter()
 const [showPass,setShowPass] = useState(false)
 const [showConfirmPass, setShowConfirmPass] = useState(false);
 /////////////////////////// validation schema
    let validationSchemaWithYup = Yup.object().shape({
        fullName: Yup.string()
            .min(3, 'اقل حاجه 3 حروف')
            .max(30, 'اكتر حاجه 30 حرف')
            .required('الاسم بالكامل لازم ينكتب')
            .matches(/^[a-zA-Z0-9\u0600-\u06FF]+(?:[ _-][a-zA-Z0-9\u0600-\u06FF]+)*$/, `متستعملش رموز غريبه زي ( ' , " , -- , ; )`),
        
        password: Yup.string()
            .min(8, 'اقل حاجه 8 حروف')
            .required('كلمه السر مطلوبه')
            .matches(/^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_-]).{8,64}$/, 'كلمه السر لازم يكون فيها رمز مميز زي الشباك ومعاه رقم ومعاه حرف كابيتال وواحد سمول ومنغير مسافات'),
        
        confirmPassword: Yup.string()
            .required('تأكيد كلمة المرور مطلوب')
            .oneOf([Yup.ref('password'), null], 'كلمتا المرور غير متطابقتين')
    })
 /////////////////////////// initialValues
    let mySchemaInitialValues = {
        fullName: '',
        password: '',
        confirmPassword: ''
    }
 /////////////////////////// handleSubmit
    let handleSubmit =(values, { setFieldError })=>{
        let users = readUsersFromLocalStorage();
        // هو انت موجود قبل كده ؟
    let isExist = users.some((user) => user.fullName === values.fullName);
    if (isExist) {
        setFieldError('fullName', 'اسم المستخدم هذا مسجل بالفعل!');
        toast.error('اسم المستخدم مسجل بالفعل!');
        return;
    }
    //  تعال نعمل يوسر جديد
    let newUser = {
        id: crypto.randomUUID(),
        fullName: values.fullName,
        password: values.password
    };
    // تعال نعين اليوسر 
     users.push(newUser);
    //  نعينه في كل اليوسرز
    saveUsersToLocalStorage(users);
    //  نعينه في اوبجكت لوحده 
    saveCurrentUserToLocalStorage(newUser);
    // تعال نحط التوكن ونخش السستم 
    const userToken = crypto.randomUUID(); 
document.cookie = `token=${userToken}; path=/; max-age=604801; SameSite=Lax`;
    toast.success('تم إنشاء الحساب بنجاح!');
    setTimeout(() => {
        window.location.href = '/';
    }, 500);
    }

    
  return (
<Formik initialValues={mySchemaInitialValues} validationSchema={validationSchemaWithYup} onSubmit={handleSubmit}>
    <Form>
        {/* الاسم كامل*/}
        <div className="fullName flex flex-col  w-full">
            <label htmlFor="" className='text-[14px] font-semibold text-[#374151] mb-2'>الاسم بالكامل</label>
            <div className="inputWithIcon w-full relative">
                <svg className='absolute right-0 -translate-1/2 top-1/2 text-gray-400' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <Field name="fullName" type="text" className='outline-none focus:border-black/40 transition w-full text-[16px] text-[#111827] border border-[#E2E8F0] rounded-lg py-2.5 pr-10 pl-2 text-end' placeholder='مثال: د. عمر أحمد' />
            </div>
            <ErrorMessage name="fullName" component="p" className="text-red-500 text-xs mt-1" />
        </div>

        {/* كلمة المرور */}
        <div className="password flex flex-col w-full mt-8 mb-6">
            <label htmlFor="" className='text-[14px] font-semibold text-[#374151] mb-2'>كلمة المرور</label>
            <div className="inputWithIcon w-full relative">
                <button type='button' onClick={() => setShowPass(!showPass)}>
                    {showPass ? <Eye className='absolute left-5 text-gray-400 top-1/2 -translate-1/2' /> : <EyeOff className='absolute left-5 text-gray-400 top-1/2 -translate-1/2' />}
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-400 absolute top-1/2 -translate-1/2 right-0' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                <Field type={showPass ? 'text' : 'password'} name="password" className={`outline-none focus:border-black/40 transition w-full text-[16px] text-[#111827] border border-[#E2E8F0] rounded-lg py-2.5 pr-10 pl-2 text-end ${showPass ? '' : 'tracking-[0.2em] font-mono'}`} placeholder='••••••••' />
            </div>
            <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
        </div>

        {/* تأكيد كلمة المرور */}
        <div className="confirmPassword flex flex-col mt-8 mb-6">
            <label htmlFor="" className='text-[14px] font-semibold text-[#374151] mb-2'>تأكيد كلمة المرور</label>
            <div className="inputWithIcon w-full relative">
                <button type='button' onClick={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass ? <Eye className='absolute left-5 text-gray-400 top-1/2 -translate-1/2' /> : <EyeOff className='absolute left-5 text-gray-400 top-1/2 -translate-1/2' />}
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-400 absolute top-1/2 -translate-1/2 right-0' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                <Field type={showConfirmPass ? 'text' : 'password'} name="confirmPassword" className={`outline-none focus:border-black/40 transition w-full text-[16px] text-[#111827] border border-[#E2E8F0] rounded-lg py-2.5 pr-10 pl-2 text-end ${showConfirmPass ? '' : 'tracking-[0.2em] font-mono'}`} placeholder='••••••••' />
            </div>
            <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-xs mt-1" />
        </div>
        <div className="terms flex items-center justify-end gap-2 mb-6 text-[14px]">
    <label htmlFor="terms" className="text-[#4B5563] cursor-pointer" dir='rtl'>
        أوافق على <Link href="#" className="text-[#0d9488] font-bold hover:underline">شروط الخدمة</Link> و <Link href="#" className="text-[#0d9488] font-bold hover:underline">سياسة الخصوصية</Link> الخاصة بالنظام.
    </label>
    <Field 
        type="checkbox" 
        name="terms" 
        id="terms" 
        className="w-4 h-4 accent-[#0d9488] rounded border-gray-300 cursor-pointer" 
    />
</div>

<button 
    type="submit" 
    className="w-full bg-[#0d9488] hover:bg-[#0b7a70] text-white font-bold text-[16px] py-3.5 rounded-xl shadow-md transition duration-300 hover:scale-[1.01] active:scale-[0.99] mb-8"
>
    إنشاء حسابي الآن
</button>

<div className="border-t border-[#F1F5F9] pt-6 text-center text-[14px] text-[#64748B]">
    لديك حساب بالفعل؟{" "}
    <Link href="/login" className="text-[#0d9488] font-bold hover:underline">
        تسجيل الدخول من هنا
    </Link>
</div>
    </Form>
</Formik>
  )
}
