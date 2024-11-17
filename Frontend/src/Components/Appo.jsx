import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './appointmentDetails.css';

function Appo() {
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate(); 
  const redirectToAddAppointment = () => {
    navigate('/Addappo'); // Replace '/addappo' with the actual route for AddAppo.jsx in your application
  };

  const clear = () => {
    setAppointmentId("")
  }

  const fetchAppointment = () => {
    if (!appointmentId) {
      setError("Appointment ID is required.");
      return;
    }

    axios.get(`http://localhost:6969/appointment/${appointmentId}`)
      .then(response => {
        setAppointmentData(response.data);
        setError(""); // Clear any previous errors
      })
      .catch(err => {
        console.error(err);
        setError("Could not fetch appointment details. Please check the ID.");
        setAppointmentData(null);
      });
  };

  return (
    <div className="container">
      <h2>Fetch Appointment Details</h2>
      <div className="mb-3">
        <label className="form-label">Appointment ID</label>
        <input 
          type="number" 
          className="form-control" 
          onChange={(e) => setAppointmentId(e.target.value)} 
          value={appointmentId} 
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={fetchAppointment}>
        Fetch Details
      </button>
      <button type="button" className='m-4 btn btn-danger' onClick={clear}>Clear</button>
      <br />
      <button className="my-4 btn btn-secondary" onClick={redirectToAddAppointment}>
        Add New Appointment
      </button>

      {error && <p className="error-message">{error}</p>}
      
      {appointmentData && (
        <div className="appointment-details">
          <h3 className='my-2'>Appointment Details</h3>
          <p><strong>Appointment ID:</strong> {appointmentData.appointment_id}</p>
          <p><strong>Patient ID:</strong> {appointmentData.patient_id}</p>
          <p><strong>Doctor ID:</strong> {appointmentData.doctor_id}</p>
          <p><strong>Room Number:</strong> {appointmentData.room_number}</p>
          <p><strong>Appointment Date:</strong> {appointmentData.appointment_date}</p>
          <p><strong>Appointment Time:</strong> {appointmentData.appointment_time}</p>
          <p><strong>Reason:</strong> {appointmentData.reason}</p>
          <p><strong>Status:</strong> {appointmentData.status}</p>
        </div>
      )}
    </div>
  );
}

export default Appo;
