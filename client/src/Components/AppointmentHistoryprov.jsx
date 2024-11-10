import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/Bookingstyle.css";
import { useLocation } from 'react-router-dom';

const AppointmentHistory2 = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userdats = location.state;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/Appointment/getappointmentforprovider`, {
          for_id: userdats.id
        });
        const appointmentsData = await response.data;

        // Fetch patient data for each appointment
        const appointmentsWithPatientData = await Promise.all(
          appointmentsData.map(async appointment => {
            const patientResponse = await axios.post("http://localhost:8080/getuserdata", {
              id: appointment.user_id
            });
            const patientData = await patientResponse.data;
            return { ...appointment, user: patientData };
          })
        );

        // Filter appointments for history (yesterday and before)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayISOString = yesterday.toISOString().split('T')[0];
        const historyAppointments = appointmentsWithPatientData.filter(appointment => appointment.date < yesterdayISOString);
        
        setAppointments(historyAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  return (
    <div className="booking-container">
      <h2 className="booking-title">Appointment History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        appointments.length === 0 ? (
          <p>No appointment history found.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Patient Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.booking_id}>
                  <td>{appointment.booking_id}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.slot}</td>
                  <td>{appointment.user ? appointment.user.name : 'N/A'}</td>
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

export default AppointmentHistory2;
