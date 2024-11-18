import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientTable() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");

  // Fetch patient data on component mount
  useEffect(() => {
    axios.get('http://localhost:6969/patients')
      .then(response => {
        setPatients(response.data);
        setError("");
      })
      .catch(err => {
        console.error(err);
        setError("Could not fetch patient data. Please try again later.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Patient Information</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Blood Type</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.patient_id}>
                <td>{patient.patient_id}</td>
                <td>{patient.name}</td>
                <td>{patient.dob}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone}</td>
                <td>{patient.email}</td>
                <td>{patient.address}</td>
                <td>{patient.blood_type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No patient data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;
