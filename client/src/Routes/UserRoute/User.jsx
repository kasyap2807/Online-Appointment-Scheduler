import React from 'react'
import { Route,Routes,useLocation } from 'react-router-dom'
import BookingTable from '../../Components/MyBookings'
import TodayAppointments from '../../Components/TodayAppointmentsuser'
import AppointmentHistory from '../../Components/AppointmentHistory'
import DoctorAppointmentForm from '../../Components/DoctorAppointmentForm'
import Error from '../../Components/Error'
import NavBar from '../../Components/NavBar'

function User() {
  const location = useLocation();
  let userdat = location.state;
  // console.log(userdat)
  if(userdat!=undefined){
    return (
      <>
      <NavBar isLoggedIn={3} userdat={userdat}/>      
      <div>
          <Routes>
              <Route path='/' element={<BookingTable/>}/>
              <Route path='/today' element={<TodayAppointments/>}/>
              <Route path='/History' element={<AppointmentHistory/>}/>
              <Route path='/new' element={<DoctorAppointmentForm/>}/>
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

export default User