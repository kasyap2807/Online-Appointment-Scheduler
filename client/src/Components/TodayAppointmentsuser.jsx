import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/Bookingstyle.css";
import { useLocation } from 'react-router-dom';

const TodayAppointments = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userdats = location.state;

  useEffect(() => {
    const today = new Date();
    const todayISOString = today.toISOString().split('T')[0];

    const fetchAppointments = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/Appointment/getappointmentforuser`, {
          user_id: userdats.id
        });
        const appointmentsData = await response.data;

        // Fetch doctor data for each appointment
        const appointmentsWithDoctorData = await Promise.all(
          appointmentsData.map(async appointment => {
            const doctorResponse = await axios.post("http://localhost:8080/organ/getdocsname", {
              id: appointment.for_id
            });
            const doctorData = await doctorResponse.data;
            return { ...appointment, doctor: doctorData };
          })
        );

        // Filter appointments for today
        const todayAppointments = appointmentsWithDoctorData.filter(appointment => appointment.date === todayISOString);
        
        setAppointments(todayAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div className="booking-container">
      <h2 className="booking-title">Today's Appointments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        appointments.length === 0 ? (
          <p>No appointments for today.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.booking_id}>
                  <td>{appointment.booking_id}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.slot}</td>
                  <td>{appointment.doctor ? appointment.doctor.name : 'N/A'}</td>
                  <td>{appointment.doctor ? appointment.doctor.designation : 'N/A'}</td>
                  <td>{appointment.status || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default TodayAppointments;
