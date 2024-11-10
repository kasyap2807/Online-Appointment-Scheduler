import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/styles.css';
import {  useLocation, useNavigate } from 'react-router-dom';

function DoctorAppointmentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdat = location.state;
  const [providerType, setProviderType] = useState('');
  const [category, setCategory] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showdoc,setshowdoc] = useState(false);
  const [user_id,setUser_id] = useState(1)

  useEffect(() => {
    // Fetch slots based on selected date and doctor
    const fetchSlots = async () => {
        const body = {
            date:selectedDate,
            for_id:selectedDoctor
        }
        const response = await axios.post("http://localhost:8080/Appointment/getAvilable",body);
        setSlots(response.data);
    };

    fetchSlots();
  }, [selectedDoctor, selectedDate]);

  const handleProviderTypeChange = async() => {
    setshowdoc(true);
    console.log(providerType+" "+category)

    const body = {
        designation:category
    }
    const response = await axios.post("http://localhost:8080/organ/getdocs",body)
    setDoctors(response.data);
  };

  const bookappointment = async () => {
    
    try {
      const response = await axios.post('http://localhost:8080/Appointment/setappoimtment', {
        date:selectedDate,
        slot:selectedSlot,
        for_id:selectedDoctor,
        user_id:userdat.id,
        status:"pending"
      });
      navigate("/user",{ state:
        (userdat)
        })

      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <>
    <div className='conts'>
      <h2>Book an Appointment</h2>
      <div>
        <label htmlFor="providerType">Select Provider Type:</label>
        <select id="providerType" value={providerType}  onChange={(e) => setProviderType(e.target.value)}>
          <option value="">Select Provider Type</option>
          <option value="consultant">Consultant</option>
          <option value="specialist">Specialist</option>
          <option value="lecturer">Lecturer</option>
        </select>

        {providerType && (
          <>
            <label htmlFor="category">Select Category:</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {providerType === 'consultant' && (
                <>
                  <option value="kids">Kids</option>
                  <option value="adults">Adults</option>
                  <option value="old">Old</option>
                </>
              )}
              {providerType === 'specialist' && (
                <>
                  <option value="cardiologist">Cardiologist</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="ENT">ENT</option>
                  <option value="dermatologist">Dermatologist</option>
                  <option value="orthopedist">Orthopedist</option>
                  <option value="ophthalmologist">Ophthalmologist</option>
                  <option value="gastroenterologist">Gastroenterologist</option>
                  <option value="urologist">Urologist</option>
                  <option value="endocrinologist">Endocrinologist</option>
                </>
              )}
              {providerType === 'lecturer' && (
                <>
                  <option value="dean">Dean</option>
                  <option value="senior">Senior Lecturer</option>
                  <option value="junior">Junior Lecturer</option>
                  <option value="labAssistant">Lab Assistant</option>
                </>
              )}
            </select>
          </>
        )}
        
        <button onClick={handleProviderTypeChange}>get docters</button>

        {(showdoc)?(
            <>
        <label htmlFor="doctor">Select Doctor:</label>
        <select id="doctor" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
          ))}
        </select>

        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} max={(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]} required />

        <label htmlFor="slot">Select Slot:</label>
        <select id="slot" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} disabled={slots.length === 0}>
          <option value="">Select Slot</option>
          {slots.map((slot, index) => (
            <option key={index} value={slot.slotno}>{slot.start_time}</option>
          ))}
        </select>

        <button onClick={bookappointment}>Submit</button>
        </>):(
            <></>
        )}
      </div>
    </div>
    </>
  );
}

export default DoctorAppointmentForm;
