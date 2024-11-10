import User from "./Routes/UserRoute/User";
import Organijation from "./Routes/OrgnRoute/Organijation";
import LoginSignupForm from "./Components/Login"
import NavBar from "./Components/NavBar";

import './App.css';

import { Route, Router, Routes } from "react-router-dom";

function App() {
  let isLoggedIn = true
  return (
    <div className="App">
      {/* <NavBar isLoggedIn={isLoggedIn}/>
      {/* <AppointmentForm/> */}
      {/* <LoginSignupForm/> */}
      {/* <DoctorAppointmentForm/> */}
      {/* <Error/> */}

    <Routes>
      <Route path="/" element={<LoginSignupForm/>}/>
      <Route path="/user/*" element={<User/>}/>
      <Route path="/org/*" element={<Organijation/>}/>
    </Routes>
    </div>
  );
}

export default App;
