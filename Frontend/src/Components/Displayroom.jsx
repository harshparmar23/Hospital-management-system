import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RoomTable() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  // Fetch room data on component mount
  useEffect(() => {
    axios.get('http://localhost:6969/roomview')
      .then(response => {
        setRooms(response.data);
        setError("");
      })
      .catch(err => {
        console.error(err);
        setError("Could not fetch room data. Please try again later.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Room Information</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Room ID</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <tr key={room.room_id}>
                <td>{room.room_id}</td>
                <td>{room.room_number}</td>
                <td>{room.room_type}</td>
                <td>{room.availability_status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No room data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RoomTable;
