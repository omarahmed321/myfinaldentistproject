// storage.js — دلوقتي بيتكلم مع Supabase بدل localStorage
import { createClient } from '@/utils/supabase/client';


let _client;
function getSupabase() {
  if (!_client) _client = createClient();   // مفيش عميل؟ اعمله
  return _client;                          
}

//////////////////////// المرضى 

// هات كل المرضي الدكتور الحالي ده ليه علاقه مباشره ب RLS الي في supabase 
// حته انه يجيب المرضي بتوع اليوزر اللي فاتح حاليا مخصوص
export async function readMyPatients() {
  const { data, error } = await getSupabase()
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

// جيب مريض بال id بتاعه 
// used specificly for patientdetail and addpatient
export async function getPatientById(id) {
  const { data, error } = await getSupabase()
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null; 
  // بيرجع نل عشان هو patient واحد مش كل المرضي عشان ارجعله اراي فاضي مثلا
  return data;
}

// إضافة مريض جديد
export async function addPatient(patient) {
  const { error } = await getSupabase().from('patients').insert(patient);
  return !error;
}

// تعديل مريض
export async function updatePatient(id, patient) {
  const { error } = await getSupabase().from('patients').update(patient).eq('id', id);
  return !error;
}

// مسح مريض بمواعيده
export async function deletePatient(id) {
  const { error } = await getSupabase().from('patients').delete().eq('id', id);
  return !error;
}

//////////////////////// المواعيد 

// كل مواعيد الدكتور 
export async function readAppointments() {
  const { data, error } = await getSupabase()
    .from('appointments')
    .select('id, status, date, time, procedure, patientId:patient_id, patientName:patient_name');
  if (error) return [];
  return data;
}

// مواعيد مريض معيّن
export async function readPatientAppointments(patientId) {
  const { data, error } = await getSupabase()
    .from('appointments')
    .select('id, status, date, time, procedure, patientId:patient_id, patientName:patient_name')
    .eq('patient_id', patientId);
  if (error) return [];
  return data;
}

// إضافة موعد
export async function addAppointment(appointment) {
  const { error } = await getSupabase().from('appointments').insert(appointment);
  return !error;
}

// تعديل حالة موعد
export async function updateAppointmentStatus(id, status) {
  const { error } = await getSupabase().from('appointments').update({ status }).eq('id', id);
  return !error;
}

// مسح موعد
export async function deleteAppointment(id) {
  const { error } = await getSupabase().from('appointments').delete().eq('id', id);
  return !error;
}

//////////////////////// اليوزر الحالي 
export async function getCurrentUser() {
  const { data } = await getSupabase().auth.getUser();
  return data.user;
}
//////////////////////// تسجيل خروج 
export async function logout() {
  await getSupabase().auth.signOut();
}

//////////////////////// تواريخ بالتوقيت المحلي 
// مبنستخدمش toISOString عشان بيحوّل ل UTC وبيغلط في التاريخ بالليل
// دي بتاخد اي تاريخ وترجعه بشكل YYYY-MM-DD بتوقيت جهاز المستخدم
export function toLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// تاريخ النهارده بس
export function getTodayLocal() {
  return toLocalDateString(new Date());
}
//////////////////////// الدخول بجوجل 
export async function signInWithGoogle() {
  const { error } = await getSupabase().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return !error;
}