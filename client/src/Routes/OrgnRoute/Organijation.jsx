import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import TodayAppointmentsDoctorView from '../../Components/TodayAppointmentsDoctorView'
import AllAppointmentsToday from '../../Components/AllAppointmentsToday'
import AppointmentHistory2 from '../../Components/AppointmentHistoryprov'
import DocterLeaveform from '../../Components/LeaveForm'
import Error from '../../Components/Error'
import NavBar from '../../Components/NavBar'

function Organijation() {
  const location = useLocation();
  let userdat = location.state;
  // console.log(userdat)
  if(userdat!=undefined){
  return (
    <>
      <NavBar isLoggedIn={2} userdat={userdat}/>
    <div>
      <Routes>
        <Route path='/' element={<TodayAppointmentsDoctorView/>}/>
        <Route path='/History' element={<AppointmentHistory2/>}/>
        <Route path='/Leave' element={<DocterLeaveform/>}/>
        <Route path='/upcoming' element={<AllAppointmentsToday/>}/>
      </Routes>
    </div>
    </>
  )
}
else{
  return(
    <>
    <Error/>
    </>
  )
}
}

export default Organijation