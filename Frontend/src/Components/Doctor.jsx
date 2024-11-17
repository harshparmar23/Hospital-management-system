import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Doctor() {
  const [specialty, setSpecialty] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const redirectToAddDoctor = () => {
    navigate('/adddoctor'); // Replace '/adddoctor' with the actual route
  };

  const clear = () => {
    setSpecialty("");
    setDoctorData(null);
    setError("");
  };

  const fetchDoctor = () => {
    if (!specialty) {
      setError("Specialty is required.");
      return;
    }

    axios
      .get(`http://localhost:6969/doctor/${specialty}`)
      .then((response) => {
        setDoctorData(response.data);
        setError(""); // Clear any previous errors
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch doctor details. Please check the specialty.");
        setDoctorData(null);
      });
  };

  return (
    <div className="container">
      <h2>Fetch Doctor Details</h2>
      <div className="mb-3">
        <label className="form-label">Specialty</label>
        <select
          className="form-select"
          onChange={(e) => setSpecialty(e.target.value)}
          value={specialty}
        >
          <option value="">Select Specialty</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
          <option value="Psychiatry">Psychiatry</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Oncology">Oncology</option>
        </select>
      </div>
      <button type="button" className="btn btn-primary" onClick={fetchDoctor}>
        Fetch Details
      </button>
      <button type="button" className="m-4 btn btn-danger" onClick={clear}>
        Clear
      </button>
      <br />
      <button className="btn btn-secondary" onClick={redirectToAddDoctor}>
        Add New Doctor
      </button>

      {error && <p className="error-message text-danger">{error}</p>}
      <br />
      {doctorData && (
        <div className="appointment-details">
          <h3>Doctor Details</h3>
          <p><strong>Doctor ID:</strong> {doctorData.doctor_id}</p>
          <p><strong>Name:</strong> {doctorData.name}</p>
          <p><strong>Specialty:</strong> {doctorData.specialty}</p>
          <p><strong>Phone:</strong> {doctorData.phone}</p>
          <p><strong>Email:</strong> {doctorData.email}</p>
          <p><strong>Department ID:</strong> {doctorData.department_id}</p>
        </div>
      )}
    </div>
  );
}

export default Doctor;
