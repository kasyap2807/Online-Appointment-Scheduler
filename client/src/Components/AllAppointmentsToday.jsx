import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/Bookingstyle.css";
import { useLocation } from 'react-router-dom';

const AllAppointmentsToday = ({ doctorId }) => {
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
        
        setAppointments(appointmentsWithPatientData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await axios.post(`http://localhost:8080/Appointment/statusupdate`, {
        booking_id: appointmentId,
        status: newStatus
      });
      // Update status in state
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.booking_id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">All Appointments From Today</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        appointments.length === 0 ? (
          <p>No appointments from today onwards.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Patient Name</th>
                <th>Status</th>
                <th>Action</th>
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
                  <td>
                    <select
                      value={appointment.status || ''}
                      onChange={(e) => handleStatusUpdate(appointment.booking_id, e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default AllAppointmentsToday;
