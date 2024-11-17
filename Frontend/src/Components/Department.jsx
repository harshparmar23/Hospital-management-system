import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctor.css';



function Department() {

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [department_id, setDepartment_id] = useState("");


  useEffect(() => {
    // Fetch initial data from backend
    axios.get('http://localhost:6969/departments')
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
  
      axios.post('http://localhost:6969/add-department', { department_id, name, description})
        .then((response) => {
          console.log(response);
          setName("");
          setDescription("");
          setDepartment_id("");

          // Refresh data
          return axios.get('http://localhost:6969/departments');
        })
        .then(response => setData(response.data))
        .catch(error => console.error(error));
  };

  const deleteDepartment = (department_id) => {
    axios.delete(`http://localhost:6969/delete-department/${department_id}`)
      .then(response => {
        console.log(response);
        alert(response.data.Message); // Show a message after deletion
        // Refresh data after successful deletion
        return axios.get('http://localhost:6969/departments'); // Replace 'doctors' with your actual endpoint to fetch doctor data
      })
      .then(response => setData(response.data)) // Update state with refreshed data
      .catch(error => console.error(error));
  };

  const clearData = () => {
    axios.delete('http://localhost:6969/clear-departments')
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
          <label className="form-label">Department ID</label>
          <input 
            type="number" 
            className="form-control" 
            onChange={(e) => setDepartment_id(e.target.value)} 
            value={department_id} 
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
          <label className="form-label">Description</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
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
            <th>Department ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
                <td>{d.department_id}</td>
                <td>{d.name}</td>
                <td>{d.description}</td>
                <td>
                <button 
                type="button"   
                className="btn btn-danger" 
                onClick={() => deleteDepartment(d.department_id)}>
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

export default Department;
