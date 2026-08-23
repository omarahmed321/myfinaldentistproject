// All of the localStorage Functions

////////////////////////////////////////// فانكشن حمايه اللوكال ستورج وفانكشن عامه للكل
function globalLocalStorage(key, value) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return arguments.length === 1 ? null : false;
  }

  // arguments.length ===1 means there is key only = get
  if (arguments.length === 1) {
    const savedData = localStorage.getItem(key);
    if (savedData === null) {
      return null;
    }

    try {
      return JSON.parse(savedData);
    } catch (error) {
      throw new Error('failed to get the key ');
    }
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
export let readAppointments = () => globalLocalStorage('appointments') || [];
// write
export let saveAppointments = (newAppointments) =>
  globalLocalStorage('appointments', newAppointments);
////////////////////////////////////////// Patients functions
// read
export let readPatients = () => globalLocalStorage('patients') || [];
// write
export let savePatients = (newPatients) =>
  globalLocalStorage('patients', newPatients);
////////////////////////////////////////// Users functions
// read
export let readUsers = () => globalLocalStorage('users') || [];
// write
export let saveUsers = (newUsers) => globalLocalStorage('users', newUsers);
////////////////////////////////////////// specific Users functions / current user {its an object not array}
// هي الفكره اني لازم اعمل اراي لليوسر الحالي
// read
export let readCurrentUser = () => globalLocalStorage('currentUser');
// save
export let saveCurrentUser = (user) => globalLocalStorage('currentUser', user);
// remove {needed cuz when signout}
export let clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};
////////////////////////////////////////// read patients for current user 
export let readMyPatients = () => {
  let currentUser = readCurrentUser();
  let allPatients = readPatients();
  return allPatients.filter((patient) => patient.userId === currentUser?.id);
};
////////////////////////////////////////// delete patient and his appointments
export let deletePatients = (patientId) => {
  // patient deletion
  let allPatients = readPatients();
  let updatedPatients = allPatients.filter(
    (patient) => patient.id !== patientId
  );
  savePatients(updatedPatients);
  // appointments deletion
  let allAppointments = readAppointments();
  let updatedAppointments = allAppointments.filter(
    (appointment) => appointment.patientId !== patientId
  );
  saveAppointments(updatedAppointments);
};
