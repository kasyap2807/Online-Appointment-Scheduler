import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/Bookingstyle.css";
import { useNavigate, useLocation } from 'react-router-dom';

const BookingTable = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  let userdat = location.state;

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Convert dates to ISO string format
    const todayISOString = today.toISOString().split('T')[0];
    const yesterdayISOString = yesterday.toISOString().split('T')[0];

    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/Appointment/getappointmentforuser`, {
          user_id: userdat.id
        });
        const bookingsData = await response.data;

        const bookingsWithDoctorData = await Promise.all(
          bookingsData.map(async booking => {
            // Fetch doctor data for each booking
            const doctorResponse = await axios.post("http://localhost:8080/organ/getdocsname", {
              id: booking.for_id
            })
            const doctorData = await doctorResponse.data;
            return { ...booking, doctor: doctorData };
          })
        );

        // Filter bookings based on date
        const filteredBookings = bookingsWithDoctorData.filter(
          booking => booking.date >= todayISOString
        );
        setBookings(filteredBookings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="booking-container">
      <h2 className="booking-title">Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Doctor Name</th>
            <th>Specialization</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.date}</td>
              <td>{booking.slot}</td>
              <td>{booking.doctor.name}</td>
              <td>{booking.doctor.designation}</td>
              <td>{booking.status || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
