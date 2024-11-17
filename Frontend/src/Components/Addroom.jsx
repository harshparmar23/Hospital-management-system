import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctor.css';



function Room() {

    const [data, setData] = useState([]);
    const [room_number, setRoomNumber] = useState("");
    const [room_type, setRoomType] = useState("");
    const [availability, setAvailability] = useState(true);



  useEffect(() => {
    // Fetch initial data from backend
    axios.get('http://localhost:6969/rooms')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const submit = () => {

  
    axios.post('http://localhost:6969/add-room', { room_number, room_type, availability})
        .then((response) => {
          console.log(response);
          setRoomNumber("");
          setRoomType("");
          setAvailability(true);

          // Refresh data
          return axios.get('http://localhost:6969/rooms');
        })
        .then(response => setData(response.data))
        .catch(error => console.error(error));
  };

  const deleteRoom = (room_number) => {
    axios.delete(`http://localhost:6969/delete-room/${room_number}`)
      .then(response => {
        console.log(response);
        alert(response.data.Message); // Show a message after deletion
        // Refresh data after successful deletion
        return axios.get('http://localhost:6969/rooms'); // Replace 'doctors' with your actual endpoint to fetch doctor data
      })
      .then(response => setData(response.data)) // Update state with refreshed data
      .catch(error => console.error(error));
  };

  const clearData = () => {
    axios.delete('http://localhost:6969/clear-rooms')
      .then(response => {
        console.log(response);
        setData([]); // Clear the data from the frontend state
      })
      .catch(error => console.error(error));
  };


  return (
    <>
    <div className="container">
    <form>
      <div className="mb-3">
        <label className="form-label">Room Number</label>
        <input
          type="text"
          className="form-control"
          value={room_number}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Room Type</label>
        <select
          className="form-control"
          value={room_type}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">Select Room Type</option>
          <option value="General">General</option>
          <option value="ICU">ICU</option>
          <option value="Private">Private</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Availability</label>
        <select
          className="form-control"
          value={availability}
          onChange={(e) => setAvailability(e.target.value === "true")}
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>
      <button type="button" className="btn btn-primary" onClick={submit}>
        Add Room
      </button>
    </form>

    <button type="button" className="btn btn-danger" onClick={clearData}>
    Clear All Data
        </button>


      <br /><br />
      
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Room type</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((room, i) => (
            <tr key={i}>
                <td>{room.room_number}</td>
                <td>{room.room_type}</td>
                <td>{room.availability}</td>
                <td>
                <button 
                type="button"   
                className="btn btn-danger" 
                onClick={() => deleteRoom(room.room_number)}>
                Delete
              </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Room;
