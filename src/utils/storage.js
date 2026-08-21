// All of the localStorage Functions



////////////////////////////////////////// فانكشن حمايه اللوكال ستورج وفانكشن عامه للكل
function globalLocalStorageFunction(key,value){
if( typeof window ==='undefined' || !window.localStorage){
    return arguments.length === 1 ? null : false;}

// arguments.length ===1 means there is key only = get 
 if(arguments.length ===1){
  const savedData = localStorage.getItem(key)
  if(savedData === null){
    return null;
  }

  try{return JSON.parse(savedData)}
  catch(error){ throw new Error('failed to get the key ')}
 }
  // Set
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }

}
////////////////////////////////////////// Appointments functions 
// read
export let readAppointmentsFromLocalStorage = () => globalLocalStorageFunction('appointments') || [];
// write
export let saveAppointmentsToLocalStorage = (newAppointments) => globalLocalStorageFunction('appointments',newAppointments)
////////////////////////////////////////// Patients functions
// read
export let readPatientsFromLocalStorage = () => globalLocalStorageFunction('patients') || [];
// write
export let savePatientsToLocalStorage = (newPatients) => globalLocalStorageFunction('patients',newPatients)
////////////////////////////////////////// Users functions
// read
export let readUsersFromLocalStorage = () => globalLocalStorageFunction('users') || [];
// write
export let saveUsersToLocalStorage = (newUsers) => globalLocalStorageFunction('users',newUsers)
////////////////////////////////////////// specific Users functions / current user {its an object not array}
// هي الفكره اني لازم اعمل اراي لليوسر الحالي
// read
export let readCurrentUserFromLocalStorage = () => globalLocalStorageFunction('currentUser')
// save 
export let saveCurrentUserToLocalStorage = (user) => globalLocalStorageFunction('currentUser',user)
// remove {needed cuz when signout}
export let clearCurrentUserFromLocalStorage = () => {
  localStorage.removeItem('currentUser');
}
////////////////////////////////////////// filter /current user 
export let readMyPatientsFromLocalStorage = () => {
  let currentUser = readCurrentUserFromLocalStorage();
  let allPatients = readPatientsFromLocalStorage();
  return allPatients.filter(patient => patient.userId === currentUser?.id);
}
////////////////////////////////////////// delete patient and his appointments
export let deletePatientAndHisAppointments = (patientId) => {
  // patient deletion
  let allPatients = readPatientsFromLocalStorage();
  let updatedPatients = allPatients.filter(patient => patient.id !== patientId);
  savePatientsToLocalStorage(updatedPatients);
  // appointments deletion
  let allAppointments = readAppointmentsFromLocalStorage();
  let updatedAppointments = allAppointments.filter(app => app.patientId !== patientId);
  saveAppointmentsToLocalStorage(updatedAppointments);
};
