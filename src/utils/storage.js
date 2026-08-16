
export let readAppointmentsFromLocalStorage = () => {
  let isAppointments = localStorage.getItem('appointments');
  return isAppointments ? JSON.parse(isAppointments) : [];
}

export let saveAppointmentsToLocalStorage = (newAppointments) => {
  localStorage.setItem('appointments', JSON.stringify(newAppointments));
}