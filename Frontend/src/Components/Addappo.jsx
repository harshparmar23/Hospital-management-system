import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './appointment.css';

function Addappo() {
  const [data, setData] = useState([]);
  const [patient_id, setPatientId] = useState("");
  const [doctor_id, setDoctorId] = useState("");
  const [appointment_date, setAppointmentDate] = useState("");
  const [appointment_time, setAppointmentTime] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch initial data from backend
    axios.get('http://localhost:6969/appointments')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const submit = () => {
    axios.post('http://localhost:6969/add-appointment', { 
        patient_id, 
        doctor_id, 
         
        appointment_date, 
        appointment_time, 
         
        status 
      })
      .then((response) => {
        console.log(response);
        setPatientId("");
        setDoctorId("");
        
        setAppointmentDate("");
        setAppointmentTime("");
        
        setStatus("");

        // Refresh data
        return axios.get('http://localhost:6969/appointments');
      })
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  };

  const deleteAppointment = (appointment_id) => {
    axios.delete(`http://localhost:6969/delete-appointment/${appointment_id}`)
      .then(response => {
        console.log(response);
        alert(response.data.Message); // Show a message after deletion
        // Refresh data after successful deletion
        return axios.get('http://localhost:6969/appointments');
      })
      .then(response => setData(response.data)) // Update state with refreshed data
      .catch(error => console.error(error));
  };

  const clearData = () => {
    axios.delete('http://localhost:6969/clear-appointments')
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
            <label className="form-label">Patient ID</label>
            <input 
              type="number" 
              className="form-control" 
              onChange={(e) => setPatientId(e.target.value)} 
              value={patient_id} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Doctor ID</label>
            <input 
              type="number" 
              className="form-control" 
              onChange={(e) => setDoctorId(e.target.value)} 
              value={doctor_id} 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Appointment Date</label>
            <input 
              type="date" 
              className="form-control" 
              onChange={(e) => setAppointmentDate(e.target.value)} 
              value={appointment_date} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Appointment Time</label>
            <input 
              type="time" 
              className="form-control" 
              onChange={(e) => setAppointmentTime(e.target.value)} 
              value={appointment_time} 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Status</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={(e) => setStatus(e.target.value)} 
              value={status} 
            />
          </div>
          
          <button type="button" className="btn btn-primary" onClick={submit}>Add Appointment</button>
        </form>
        <button type="button" className="btn btn-danger" onClick={clearData}>
          Clear All Appointments
        </button>

        <br /><br />
        
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((a, i) => (
              <tr key={i}>
                <td>{a.appointment_id}</td>
                <td>{a.patient_id}</td>
                <td>{a.doctor_id}</td>
                
                <td>{a.appointment_date}</td>
                <td>{a.appointment_time}</td>
        
                <td>{a.status}</td>
                <td>
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => deleteAppointment(a.appointment_id)}>
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

export default Addappo;
