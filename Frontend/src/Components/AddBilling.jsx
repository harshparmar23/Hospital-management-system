import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './billing.css'; // Update with your actual CSS file

function AddBilling() {
  const [data, setData] = useState([]);
  const [patient_id, setPatientId] = useState("");
  const [admission_id, setAdmissionID] = useState("");
  const [total_amount, setTotalAmount] = useState("");
  const [payment_status, setPaymentStatus] = useState("");
  const [billing_date, setBillingDate] = useState("");

  useEffect(() => {
    // Fetch initial data from backend
    axios.get('http://localhost:6969/billing')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const submit = () => {
    axios.post('http://localhost:6969/add-billing', { patient_id, admission_id,total_amount, billing_date,payment_status })
      .then((response) => {
        console.log(response);
        setPatientId("");
        setTotalAmount("");
        setPaymentStatus("");
        setAdmissionID("");
        setBillingDate("");

        // Refresh data
        return axios.get('http://localhost:6969/billing');
      })
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  };

  const deleteBilling = (bill_id) => {
    axios.delete(`http://localhost:6969/delete-billing/${bill_id}`)
      .then(response => {
        console.log(response);
        alert(response.data.Message); // Show a message after deletion
        // Refresh data after successful deletion
        return axios.get('http://localhost:6969/billing');
      })
      .then(response => setData(response.data)) // Update state with refreshed data
      .catch(error => console.error(error));
  };

  const clearData = () => {
    axios.delete('http://localhost:6969/clear-billing')
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
            <label className="form-label">Admission ID</label>
            <input 
              type="number" 
              className="form-control" 
              onChange={(e) => setAdmissionID(e.target.value)} 
              value={admission_id} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Total Amount</label>
            <input 
              type="number" 
              className="form-control" 
              onChange={(e) => setTotalAmount(e.target.value)} 
              value={total_amount} 
            />
          </div>
          <div className="mb-3">
          <label className="form-label">Payment status</label>
          <select
            className="form-control"
            value={payment_status}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="">Unpaid </option>
            <option value="">Paid</option>
          </select>  
        </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input 
              type="date" 
              className="form-control" 
              onChange={(e) => setBillingDate(e.target.value)} 
              value={billing_date} 
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={submit}>
            Add Billing Record
          </button>
        </form>
        <button type="button" className="btn btn-danger" onClick={clearData}>
          Clear All Billing Records
        </button>

        <br /><br />
        <table>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Patient ID</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.billing_id}</td>
                <td>{d.patient_id}</td>
                <td>{d.total_amount}</td>
                <td>{d.payment_status}</td>
                <td>{d.billing_date}</td>
                <td>
                  <button 
                    type="button"   
                    className="btn btn-danger" 
                    onClick={() => deleteBilling(d.bill_id)}>
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

export default AddBilling;
