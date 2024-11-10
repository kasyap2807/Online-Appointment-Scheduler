import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function DocterLeaveform() {
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [leaveSlots, setLeaveSlots] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [showdoc,setShowdoc] = useState(false);
  const [user_id,setUser_id] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const userdats = location.state;

  useEffect(() => {
    // Fetch slots based on selected date
    const fetchSlots = async () => {
      if (selectedDate) {
        try {
          const response = await axios.post("http://localhost:8080/Appointment/getAvilable", {
            date: selectedDate
          });
          setSlots(response.data);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      }
    };

    fetchSlots();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  const handleSlotChange = (e) => {
    const slot = e.target.value;
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(selectedSlot => selectedSlot !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const bookLeaveSlots = async () => {
    try {
      const promises = selectedSlots.map(slot => axios.post('http://localhost:8080/Appointment/setappoimtment', {
        date: selectedDate,
        slot: slot,
        for_id: userdats.id,
        user_id: 0,
        status: "leave"
      }));

      const responses = await Promise.all(promises);

      // Update leave slots
      setLeaveSlots([...leaveSlots, ...selectedSlots.map(slot => ({ date: selectedDate, slot }))]);
      setBookingCount(bookingCount + selectedSlots.length);
    } catch (error) {
      console.error('Error booking leave slots:', error);
      setErrorMessage('Failed to book leave slots. Please try again.');
    }
  };

  const isEligibleToBookLeave = () => {
    // Check if date is selected
    if (!selectedDate) {
      setErrorMessage('Please select a date.');
      return false;
    }

    // Check if booking count is within limit (7 slots)
    if (bookingCount >= 7) {
      setErrorMessage('You have reached the maximum limit for booking leave slots.');
      return false;
    }

    // Check if at least one slot is selected
    if (selectedSlots.length === 0) {
      setErrorMessage('Please select at least one slot for leave.');
      return false;
    }

    return true;
  };

  return (
    <>
      <div>
        <h2>Book Leave Slots</h2>
        <div>
          <label htmlFor="date">Select Date:</label>
          <input type="date" id="date" value={selectedDate} onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} required />

          <label>Select Slots for Leave:</label>
          {slots.map((slot, index) => (
            <div key={index}>
              <input type="checkbox" id={`slot-${slot.slotno}`} value={slot.slotno} onChange={handleSlotChange} checked={selectedSlots.includes(slot.slotno)} />
              <label htmlFor={`slot-${slot.slotno}`}>{slot.start_time}</label>
            </div>
          ))}

          <button onClick={() => {
            if (isEligibleToBookLeave()) {
              bookLeaveSlots();
            }
          }}>Book Selected Slots for Leave</button>

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}

export default DocterLeaveform;
