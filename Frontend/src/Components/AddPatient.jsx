import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctor.css';



function Patient() {

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [patient_id, setPatient_id] = useState("");
    const [dob, setDob ]= useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [blood_type, setBloodtype] = useState("");


  useEffect(() => {
    // Fetch initial data from backend
    axios.get('http://localhost:6969/patients')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const submit = () => {
    // const tabledata = new FormData();
    // tabledata.append("tid", tid);
    // tabledata.append("name", name);

    // axios.post('http://localhost:6969/add-user', tabledata)
    //   .then((response) => {
    //     console.log(response);
    //     setName("");
    //     setTid("");
    //     // Refresh data after successful submission
    //     return axios.get('http://localhost:6969/users');
    //   })
    //   .then(response => setData(response.data))
    //   .catch(error => console.error(error));
  
      axios.post('http://localhost:6969/add-patient', { patient_id, name,dob,gender,phone,email,address,blood_type})
        .then((response) => {
          console.log(response);
          setName("");
          setPatient_id("");
          setDob("");
          setGender("");
          setPhone("");
          setEmail("");
          setAddress("");
          setBloodtype("");

          // Refresh data
          return axios.get('http://localhost:6969/patients');
        })
        .then(response => setData(response.data))
        .catch(error => console.error(error));
  };

  const deletePatient = (patient_id) => {
    axios.delete(`http://localhost:6969/delete-patient/${patient_id}`)
      .then(response => {
        console.log(response);
        alert(response.data.Message); // Show a message after deletion
        // Refresh data after successful deletion
        return axios.get('http://localhost:6969/patients'); // Replace 'doctors' with your actual endpoint to fetch doctor data
      })
      .then(response => setData(response.data)) // Update state with refreshed data
      .catch(error => console.error(error));
  };

  const clearData = () => {
    axios.delete('http://localhost:6969/clear-patients')
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
          <label className="form-label">Patients ID</label>
          <input 
            type="number" 
            className="form-control" 
            onChange={(e) => setPatient_id(e.target.value)} 
            value={patient_id} 
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
          <label className="form-label">DOB</label>
          <input 
            type="date" 
            className="form-control" 
            onChange={(e) => setDob(e.target.value)} 
            value={dob} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>  
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={(e) => setPhone(e.target.value)} 
            value={phone} 
          />
        </div><div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={(e) => setAddress(e.target.value)} 
            value={address} 
          />
        </div><div className="mb-3">
          <label className="form-label">Blood Group</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={(e) => setBloodtype(e.target.value)} 
            value={blood_type} 
          />
        </div>
        
        <button type="button" className="btn btn-primary" onClick={submit}>Add to table</button>
      </form>
    <button type="button" className="btn btn-danger" onClick={clearData}>
    Clear All Data
        </button>


      <br /><br />
      
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
                <td>{d.patient_id}</td>
                <td>{d.name}</td>
                <td>{d.dob}</td>
                <td>{d.gender}</td>
                <td>{d.phone}</td>
                <td>{d.email}</td>
                <td>{d.address}</td>
                <td>{d.blood_type}</td>
                <td>
                <button 
                type="button"   
                className="btn btn-danger" 
                onClick={() => deletePatient(d.patient_id)}>
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

export default Patient;
