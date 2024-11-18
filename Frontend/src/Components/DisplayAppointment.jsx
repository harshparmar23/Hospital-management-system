import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentTable() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  // Fetch appointment data on component mount
  useEffect(() => {
    axios.get('http://localhost:6969/appointments')
      .then(response => {
        setAppointments(response.data);
        setError("");
      })
      .catch(err => {
        console.error(err);
        setError("Could not fetch appointment data. Please try again later.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Appointment Information</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Appointment ID</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Status</th>
            <th>Patient Name</th>
            <th>Doctor Name</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td>{appointment.appointment_id}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.status}</td>
                <td>{appointment.patient_name}</td>
                <td>{appointment.doctor_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No appointment data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
