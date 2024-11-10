import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/Bookingstyle.css";
import { useLocation } from 'react-router-dom';

const AppointmentHistory = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const location = useLocation();
  const userdats = location.state;

  useEffect(() => {
    const today = new Date();
    const todayISOString = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISOString = yesterday.toISOString().split('T')[0];

    const fetchAppointments = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/Appointment/getappointmentforuser`, {
          user_id: userdats.id
        });
        const appointmentsData = await response.data;

        // Filter appointments for history (before today)
        const historyAppointments = appointmentsData.filter(appointment => appointment.date < todayISOString && appointment.date >= yesterdayISOString);
        
        setAppointments(historyAppointments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div className="booking-container">
      <h2 className="booking-title">Appointment History (Up to Yesterday)</h2>
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
            <tr key={appointment.appointment_id}>
              <td>{appointment.appointment_id}</td>
              <td>{appointment.date}</td>
              <td>{appointment.slot}</td>
              <td>{appointment.doctor.name}</td>
              <td>{appointment.doctor.designation}</td>
              <td>{appointment.status || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentHistory;
