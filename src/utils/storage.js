// storage.js — دلوقتي بيتكلم مع Supabase بدل localStorage
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

//////////////////////// المرضى 

// هات كل المرضي الدكتور الحالي ده ليه علاقه مباشره ب RLS الي في supabase 
// حته انه يجيب المرضي بتوع اليوزر اللي فاتح حاليا مخصوص
export async function readMyPatients() {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { error } = await supabase.from('patients').insert(patient);
  return !error;
}

// تعديل مريض
export async function updatePatient(id, patient) {
  const { error } = await supabase.from('patients').update(patient).eq('id', id);
  return !error;
}

// مسح مريض بمواعيده
export async function deletePatient(id) {
  const { error } = await supabase.from('patients').delete().eq('id', id);
  return !error;
}

//////////////////////// المواعيد 

// كل مواعيد الدكتور 
export async function readAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('id, status, date, time, procedure, patientId:patient_id, patientName:patient_name');
  if (error) return [];
  return data;
}

// مواعيد مريض معيّن
export async function readPatientAppointments(patientId) {
  const { data, error } = await supabase
    .from('appointments')
    .select('id, status, date, time, procedure, patientId:patient_id, patientName:patient_name')
    .eq('patient_id', patientId);
  if (error) return [];
  return data;
}

// إضافة موعد
export async function addAppointment(appointment) {
  const { error } = await supabase.from('appointments').insert(appointment);
  return !error;
}

// تعديل حالة موعد
export async function updateAppointmentStatus(id, status) {
  const { error } = await supabase.from('appointments').update({ status }).eq('id', id);
  return !error;
}

// مسح موعد
export async function deleteAppointment(id) {
  const { error } = await supabase.from('appointments').delete().eq('id', id);
  return !error;
}

//////////////////////// اليوزر الحالي 
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
//////////////////////// تسجيل خروج 
export async function logout() {
  await supabase.auth.signOut();
}