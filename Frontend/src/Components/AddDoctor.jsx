import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctor.css';

function AddDoctor() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [doctor_id, setDoctor_id] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department_id, setDepartment_id] = useState("");

  useEffect(() => {
    // Fetch initial data from backend
    axios
      .get('http://localhost:6969/doctors')
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  const submit = () => {
    axios
      .post('http://localhost:6969/add-doctor', {
        doctor_id,
        name,
        specialty,
        phone,
        email,
        department_id,
      })
      .then((response) => {
        console.log(response);
        setName("");
        setDoctor_id("");
        setSpecialty("");
        setPhone("");
        setDepartment_id("");
        setEmail("");

        // Refresh data
        return axios.get('http://localhost:6969/doctors');
      })
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  };

  const deleteDoctor = (doctorId) => {
    axios
      .delete(`http://localhost:6969/delete-doctor/${doctorId}`)
      .then((response) => {
        console.log(response);
        alert(response.data.Message); // Show a message after deletion
        // Refresh data
        return axios.get('http://localhost:6969/doctors');
      })
      .then((response) => setData(response.data)) // Update state with refreshed data
      .catch((error) => console.error(error));
  };

  const clearData = () => {
    axios
      .delete('http://localhost:6969/clear-doctors')
      .then((response) => {
        console.log(response);
        setData([]); // Clear the data from the frontend state
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="mb-3">
            <label className="form-label">Doctor ID</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setDoctor_id(e.target.value)}
              value={doctor_id}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Specialty</label>
            <select
              className="form-select"
              onChange={(e) => setSpecialty(e.target.value)}
              value={specialty}
            >
              <option value="">Select Specialty</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Oncology">Oncology</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department ID</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setDepartment_id(e.target.value)}
              value={department_id}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={submit}>
            Add to table
          </button>
        </form>
        <button type="button" className="btn btn-danger" onClick={clearData}>
          Clear All Data
        </button>

        <br />
        <br />

        <table>
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.doctor_id}</td>
                <td>{d.name}</td>
                <td>{d.specialty}</td>
                <td>{d.phone}</td>
                <td>{d.email}</td>
                <td>{d.department_id}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteDoctor(d.doctor_id)}
                  >
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

export default AddDoctor;
