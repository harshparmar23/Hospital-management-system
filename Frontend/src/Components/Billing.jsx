import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Billing() {
  const [billId, setBillId] = useState("");
  const [billData, setBillData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const clear = () => {
    setBillId("");
    setBillData(null)
  }

  const redirectToAddBilling = () => {
    navigate('/AddBilling'); // Redirect to AddBilling page
  };

  const fetchBilling = () => {
    if (!billId) {
      setError("Bill ID is required.");
      return;
    }

    axios
      .get(`http://localhost:6969/billing/${billId}`) // Replace with your actual backend API endpoint
      .then((response) => {
        setBillData(response.data);
        setError(""); // Clear any previous errors
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch billing details. Please check the ID.");
        setBillData(null);
      });
  };

  return (
    <div className="container">
      <h2>Fetch Billing Details</h2>
      <div className="mb-3">
        <label className="form-label">Bill ID</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setBillId(e.target.value)}
          value={billId}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={fetchBilling}>
        Fetch Details
      </button>
      <button type="button" className="m-4 btn btn-danger" onClick={clear}>
        Clear
      </button>
      
      <br />
      <button className="btn btn-secondary" onClick={redirectToAddBilling}>
        Add New Billing
      </button>

      {error && <p className="error-message">{error}</p>}

      {billData && (
        <div className="bill-details">
          <h3>Billing Details</h3>
          <p><strong>Bill ID:</strong> {billData.billing_id}</p>
          <p><strong>Patient ID:</strong> {billData.patient_id}</p>
          <p><strong>Total Amount:</strong> {billData.total_amount}</p>
          <p><strong>Payment Status:</strong> {billData.payment_status}</p>
          <p><strong>Date:</strong> {billData.billing_date}</p>
        </div>
      )}
    </div>
  );
}

export default Billing;
