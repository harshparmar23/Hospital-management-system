import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Room() {
  const [roomNumber, setRoomNumber] = useState("");  // Changed to roomNumber
  const [status, setStatus] = useState("available");  // Default to "available"
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [roomData, setRoomData] = useState(null); // Use null as initial state

  const navigate = useNavigate();
  const redirectToAddRoom = () => {
    navigate('/addroom'); // Replace '/adddoctor' with the actual route for adding a room
  };

  // Handle room number change
  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  // Handle status change from dropdown
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Function to check room availability by room number
  const checkAvailability = () => {
    if (!roomNumber) {
      setError("Room number is required.");
      return;
    }

    axios.get(`http://localhost:6969/check-room-number/${roomNumber}`)  // Changed the URL to use room_number
      .then(response => {
        setRoomData(response.data); // Set room data if found
        // If room is available or not, show message
        if (response.data.available) {
          setMessage("Room is currently available.");
        } else {
          setMessage("Room is currently unavailable.");
        }
        setError("");
      })
      .catch(err => {
        console.error(err);
        setError("Could not check room availability. Please try again.");
        setMessage("");
      });
  };

  // Function to update room availability status by room number
  const updateRoomStatus = () => {
    if (!roomNumber) {
      setError("Room number is required.");
      return;
    }

    axios.put(`http://localhost:6969/update-room-number/${roomNumber}`, { status: status === 'available' })  // Changed URL to use room_number
      .then(response => {
        setMessage(`Room status updated to ${status}.`);
        setError("");
        setRoomData({ ...roomData, availability: status === 'available' }); // Update availability in the UI
      })
      .catch(err => {
        console.error(err);
        setError("Could not update room status. Please try again.");
        setMessage("");
      });
  };

  // const updateRoomStatus = () => {
  //   if (!roomNumber) {
  //     setError("Room number is required.");
  //     return;
  //   }
  
  //   axios.put('http://localhost:6969/update-room-availability', {
  //     room_number: roomNumber,
  //     availability: status === 'available'  // Convert status to boolean
  //   })
  //   .then(response => {
  //     setMessage(`Room status updated to ${status}.`);
  //     setError("");
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     setError("Could not update room status. Please try again.");
  //     setMessage("");
  //   });
  // };

  // Function to clear form and reset room data
  const clear = () => {
    setRoomData(null);
    setRoomNumber("");
    setError("");
    setMessage("");
  };

  return (
    <div className="container">
      <h2>Check or Update Room Availability</h2>

      <div className="mb-3">
        <label className="form-label">Room Number</label>
        <input
          type="number"
          className="form-control"
          onChange={handleRoomNumberChange}
          value={roomNumber}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Room Status</label>
        <select
          className="form-control"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      <button type="button" className="btn btn-primary" onClick={checkAvailability}>
        Check Availability
      </button>

      <button type="button" className="m-4 btn btn-warning" onClick={updateRoomStatus}>
        Update Room Status
      </button>

      <button type="button" className="m-4 btn btn-danger" onClick={clear}>
        Clear
      </button>
      <br />
      <button className="btn btn-secondary" onClick={redirectToAddRoom}>
        Add Room
      </button>

      {error && <p className="error-message">{error}</p>}
      {roomData && (
        <div className="appointment-details">
          <h3>Room Details</h3>
          <p><strong>Room Number:</strong> {roomData.room_number}</p>
          <p><strong>Room Type:</strong> {roomData.room_type}</p>
          <p><strong>Status:</strong> {roomData.availability ? 'Available' : 'Unavailable'}</p>
        </div>
      )}
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default Room;
