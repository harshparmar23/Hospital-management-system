import React, { useState } from "react";

const GenerateBill = () => {
  const [patientId, setPatientId] = useState("");
  const [admissionId, setAdmissionId] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState("");

  const handleGenerateBill = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:6969/generate-bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId, admissionId }),
      });

      const data = await response.json();

      if (response.ok) {
        setTotalAmount(data.totalAmount);
        setError("");
      } else {
        setError(data.error || "Failed to generate bill");
        setTotalAmount(null);
      }
    } catch (err) {
      setError("Error connecting to the server");
      setTotalAmount(null);
    }
  };

  return (
    <div>
      <h1>Generate Bill</h1>
      <form onSubmit={handleGenerateBill}>
        <div>
          <label>Patient ID:</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Admission ID:</label>
          <input
            type="text"
            value={admissionId}
            onChange={(e) => setAdmissionId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Bill</button>
      </form>
      {totalAmount !== null && (
        <div>
          <h2>Total Bill: ${totalAmount}</h2>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GenerateBill;
