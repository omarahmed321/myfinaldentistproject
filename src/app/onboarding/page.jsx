'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';

export default function OnboardingPage() {
  const [clinicName, setClinicName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clinicName.trim()) {
      toast.error('اكتب اسم العيادة');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { clinicName: clinicName.trim() },
    });
    if (error) {
      toast.error('حصل خطأ، حاول تاني');
      setLoading(false);
      return;
    }
    // تحميل كامل عشان الميدل وير يشوف الـ clinicName الجديد
    window.location.href = '/';
  };

  return (
    <div className="w-full min-h-dvh bg-[#F8FAFC] flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-md w-full max-w-md text-end"
        dir="rtl"
      >
        <h1 className="text-[24px] font-bold text-[#111827] mb-2">خطوة أخيرة </h1>
        <p className="text-[#64748B] mb-6">اكتب اسم عيادتك عشان نجهّزلك لوحة التحكم</p>
        <label className="text-[14px] font-bold text-[#374151] flex flex-col gap-2">
          اسم العيادة
          <input
            type="text"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            placeholder="مثال: عيادة النور"
            className="py-2.5 px-4 border border-[#E2E8F0] rounded-lg outline-0 focus:border-black/30"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-[#0D9488] text-white font-bold py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? 'جاري الحفظ...' : 'يلا نبدأ'}
        </button>
      </form>
    </div>
  );
}