// All of the localStorage Functions


////////////////////////////////////////// Appointments functions 
// read
export let readAppointmentsFromLocalStorage = () => {
  let isAppointments = localStorage.getItem('appointments');
  return isAppointments ? JSON.parse(isAppointments) : [];
}
// write
export let saveAppointmentsToLocalStorage = (newAppointments) => {
  localStorage.setItem('appointments', JSON.stringify(newAppointments));
}
////////////////////////////////////////// Patients functions
// read
export let readPatientsFromLocalStorage = () => {
  let isPatients = localStorage.getItem('patients');
  return isPatients ? JSON.parse(isPatients) : [];
   
}
// write
export let savePatientsToLocalStorage = (newPatients) => {
  localStorage.setItem('patients', JSON.stringify(newPatients));
}
////////////////////////////////////////// Users functions
// read
export let readUsersFromLocalStorage = () => {
  let isUsers = localStorage.getItem('users');
  return isUsers ? JSON.parse(isUsers) : [];
}
// write
export let saveUsersToLocalStorage = (newUsers) => {
  localStorage.setItem('users', JSON.stringify(newUsers));
}
////////////////////////////////////////// specific Users functions / current user {its an object not array}
// هي الفكره اني لازم اعمل اراي لليوسر الحالي
// read
export let readCurrentUserFromLocalStorage = () => {
  let isCurrentUser = localStorage.getItem('currentUser');
  return isCurrentUser ? JSON.parse(isCurrentUser) : null;
}
// save 
export let saveCurrentUserToLocalStorage = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
}
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