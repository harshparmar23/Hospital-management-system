import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Doctor() {
  const [patient_id, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const redirectToAddPatient = () => {
    navigate('/addpatient'); // Replace '/adddoctor' with the actual route
  };
  const redirectToDisplayPatient = () => {
    navigate('/displaypatient'); // Replace '/adddoctor' with the actual route
  };

  const clear = () => {
    setPatientId("");
    setPatientData(null);
    setError("");
  };

  const fetchPatient  = () => {
    if (!patient_id) {
      setError("Specialty is required.");
      return;
    }

    axios
      .get(`http://localhost:6969/patient/${patient_id}`)
      .then((response) => {
        setPatientData(response.data);
        setError(""); // Clear any previous errors
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch patient details. Please check the patient_id.");
        setPatientData(null);
      });
  };

  return (
    <div className="container">
      <h2>Fetch Patient Details</h2>
      <div className="mb-3">
        <label className="form-label">Patient ID</label>
        <input
          type='number'
          className="form-select"
          onChange={(e) => setPatientId(e.target.value)}
          value={patient_id}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={fetchPatient }>
        Fetch Details
      </button>
      <button type="button" className="m-4 btn btn-danger" onClick={clear}>
        Clear
      </button>
      <br />
      <button className="btn btn-secondary" onClick={redirectToDisplayPatient}>See all Patient</button>
      <button className="m-4 btn btn-secondary" onClick={redirectToAddPatient}>
        Add New Patient
      </button>
      <br /><br />
      {error && <p className="error-message text-danger">{error}</p>}
      <br />
      {patientData && (
        <div className="appointment-details">
          <h3>Patient Details</h3>
          <p><strong>Patient ID:</strong> {patientData.patient_id}</p>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>DOB:</strong> {patientData.dob}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Phone:</strong> {patientData.phone}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
          <p><strong>Address:</strong> {patientData.address}</p>
          <p><strong>Blood Group:</strong> {patientData.blood_type}</p>
        </div>
      )}
    </div>
  );
}

export default Doctor;
