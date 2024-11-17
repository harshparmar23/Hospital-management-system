import React, { useState } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAppointment(null);

    try {
      const response = await axios.get('http://localhost:6969/appointment', {
        params: { doctor_id: doctorId, patient_id: patientId }
      });

      setAppointment(response.data[0]); // Assuming data is returned as an array
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Get Appointment Details</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="form-group">
          <label htmlFor="doctorId">Doctor ID:</label>
          <input
            type="number"
            id="doctorId"
            className="form-control"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientId">Patient ID:</label>
          <input
            type="number"
            id="patientId"
            className="form-control"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Get Appointment</button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}

      {appointment && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h3>Appointment Details</h3>
          <p><strong>Appointment ID:</strong> {appointment.appointment_id}</p>
          <p><strong>Appointment Date:</strong> {appointment.appointment_date}</p>
          <p><strong>Status:</strong> {appointment.status}</p>
        </div>
      )}
    </div>
  );
};

export default App;
