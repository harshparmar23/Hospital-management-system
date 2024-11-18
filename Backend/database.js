const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle FormData

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'FristtimeMySQL',
    database: 'miniproject'
});

db.connect((err) => {
    if (err) {
        console.log("Error in connection", err);
    } else {
        console.log("Connected to the database");
    }
});

app.get('/', (req, res) => {
    return res.json("From backend side");
});


//doctor table
app.get('/doctors', (req, res) => {
    const sql = "SELECT * FROM doctor";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/add-doctor', (req, res) => {
    console.log("Request Body:", req.body); // Log req.body to see if tid and name are present
    const sql = "INSERT INTO doctor (`doctor_id`, `name`,`specialty`,`phone`,`email`,`department_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.doctor_id, req.body.name, req.body.specialty, req.body.phone, req.body.email, req.body.department_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log the specific MySQL error
            return res.json({ Error: "Error in query", Details: err });
        }
        return res.json({ Status: "Success", data: result });
    });
});

app.delete('/delete-doctor/:doctor_id', (req, res) => {
    const sql = "DELETE FROM doctor WHERE doctor_id = ?";
    const doctorId = req.params.doctor_id;

    db.query(sql, [doctorId], (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log MySQL error details
            return res.json({ Error: "Error in delete query", Details: err });
        }
        if (result.affectedRows === 0) {
            return res.json({ Status: "Failed", Message: "No doctor found with the given doctor_id" });
        }
        return res.json({ Status: "Success", Message: "Doctor deleted successfully", data: result });
    });
});


app.delete('/clear-doctors', (req, res) => {
    const sql = "DELETE FROM doctor";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in deletion query" });
        return res.json({ Status: "Success", data: result });
    });
});


app.get('/doctor/:specialty', (req, res) => {
    const specialty = req.params.specialty;

    const query = `
      SELECT 
        doctor_id, 
        name, 
        specialty,  
        phone, 
        email,  
        department_id    
      FROM doctor 
      WHERE specialty = ?`;

    db.query(query, [specialty], (err, results) => {
        if (err) {
            console.error('Error fetching appointment:', err.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(results[0]);
    });
});


//department table
app.get('/departments', (req, res) => {
    const sql = "SELECT * FROM department";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/add-department', (req, res) => {
    console.log("Request Body:", req.body); // Log req.body to see if tid and name are present
    const sql = "INSERT INTO department (`department_id`, `name`,`description`) VALUES (?, ?, ?)";
    const values = [req.body.department_id, req.body.name, req.body.description];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log the specific MySQL error
            return res.json({ Error: "Error in query", Details: err });
        }
        return res.json({ Status: "Success", data: result });
    });
});

app.delete('/clear-departments', (req, res) => {
    const sql = "DELETE FROM department";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in deletion query" });
        return res.json({ Status: "Success", data: result });
    });
});

app.delete('/delete-department/:department_id', (req, res) => {
    const sql = "DELETE FROM department WHERE department_id = ?";
    const departmentId = req.params.department_id;

    db.query(sql, [departmentId], (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log MySQL error details
            return res.json({ Error: "Error in delete query", Details: err });
        }
        if (result.affectedRows === 0) {
            return res.json({ Status: "Failed", Message: "No doctor found with the given doctor_id" });
        }
        return res.json({ Status: "Success", Message: "Doctor deleted successfully", data: result });
    });
});

//patient table
app.get('/patients', (req, res) => {
    const sql = "SELECT * FROM PatientView";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/add-patient', (req, res) => {
    console.log("Request Body:", req.body); // Log req.body to see if tid and name are present
    const sql = "INSERT INTO patient (`patient_id`, `name`,`dob`,`gender`,`phone`,`email`,`address`,`blood_type`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.patient_id, req.body.name, req.body.dob, req.body.gender, req.body.phone, req.body.email, req.body.address, req.body.blood_type];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log the specific MySQL error
            return res.json({ Error: "Error in query", Details: err });
        }
        return res.json({ Status: "Success", data: result });
    });
});

app.delete('/delete-patient/:patient_id', (req, res) => {
    const sql = "DELETE FROM patient WHERE patient_id = ?";
    const departmentId = req.params.patient_id;

    db.query(sql, [departmentId], (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log MySQL error details
            return res.json({ Error: "Error in delete query", Details: err });
        }
        if (result.affectedRows === 0) {
            return res.json({ Status: "Failed", Message: "No doctor found with the given doctor_id" });
        }
        return res.json({ Status: "Success", Message: "Doctor deleted successfully", data: result });
    });
});

app.delete('/clear-patients', (req, res) => {
    const sql = "DELETE FROM patient";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in deletion query" });
        return res.json({ Status: "Success", data: result });
    });
});

app.get('/patient/:patient_id', (req, res) => {
    const patient_id = req.params.patient_id;

    const query = `
      SELECT 
        patient_id, 
        name, 
        dob,  
        gender, 
        phone,  
        email,
        address,
        blood_type    
      FROM patient 
      WHERE patient_id = ?`;

    db.query(query, [patient_id], (err, results) => {
        if (err) {
            console.error('Error fetching appointment:', err.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(results[0]);
    });
});


//room table
app.get('/rooms', (req, res) => {
    const sql = "SELECT * FROM Room";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.post('/add-room', (req, res) => {
    const { room_number, room_type, availability } = req.body;

    if (!room_number || !room_type || availability === undefined) {
        return res.status(400).json({ Error: "Missing required fields" });
    }

    const sql = "INSERT INTO Room (`room_number`, `room_type`, `availability`) VALUES (?, ?, ?)";
    db.query(sql, [room_number, room_type, availability], (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ Error: "Database query failed", Details: err });
        }
        res.json({ Status: "Success", Message: "Room added successfully", data: result });
    });
});



app.delete('/delete-room/:room_number', (req, res) => {
    const sql = "DELETE FROM Room WHERE room_number = ?";
    const departmentId = req.params.room_number;

    db.query(sql, [departmentId], (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log MySQL error details
            return res.json({ Error: "Error in delete query", Details: err });
        }
        if (result.affectedRows === 0) {
            return res.json({ Status: "Failed", Message: "No doctor found with the given doctor_id" });
        }
        return res.json({ Status: "Success", Message: "Doctor deleted successfully", data: result });
    });
});

app.delete('/clear-rooms.', (req, res) => {
    const sql = "DELETE FROM Room";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in deletion query" });
        return res.json({ Status: "Success", data: result });
    });
});


// Endpoint to check if a room is available or unavailable
app.get('/check-room-number/:roomNumber', (req, res) => {
    const roomNumber = req.params.roomNumber;
    const query = 'SELECT * FROM Room WHERE room_number = ?';

    db.query(query, [roomNumber], (err, results) => {
        if (err) {
            console.error('Error fetching room data:', err.message);
            return res.status(500).send('Error fetching room data');
        }

        if (results.length > 0) {
            res.json(results[0]);  // Return room data
        } else {
            res.status(404).send('Room not found');
        }
    });
});

// Endpoint to update room status by room number
app.put('/update-room-number/:roomNumber', (req, res) => {
    const roomNumber = req.params.roomNumber;
    const { status } = req.body;  // The status value ('available' or 'unavailable')

    const query = 'UPDATE Room SET availability = ? WHERE room_number = ?';

    db.query(query, [status, roomNumber], (err, result) => {
        if (err) {
            console.error('Error updating room status:', err.message);
            return res.status(500).send('Error updating room status');
        }

        if (result.affectedRows > 0) {
            res.send({ message: 'Room status updated successfully' });
        } else {
            res.status(404).send('Room not found');
        }
    });
});

// app.put('/update-room-availability', (req, res) => {
//     const { room_number, availability } = req.body;

//     // Check if room_number and availability are provided
//     if (!room_number || availability === undefined) {
//         return res.status(400).send('Room number and availability are required.');
//     }

//     // Call the stored procedure
//     db.query('CALL UpdateRoomAvailability(?, ?)', [room_number, availability], (err, results) => {
//         if (err) {
//             console.error('Error executing stored procedure:', err);
//             return res.status(500).send('Could not update room status. Please try again.');
//         }

//         // If successful, send a response
//         res.send('Room status updated successfully');
//     });
// });

app.get('/roomview', (req, res) => {
    const query = `SELECT * FROM RoomView`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching room data:', err);
            return res.status(500).send('Error fetching room data.');
        }
        res.json(results);
    });
});


//apointment table
app.get('/appointments', (req, res) => {
    const sql = "SELECT * FROM appointment";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/add-appointment', (req, res) => {
    console.log("Request Body:", req.body); // Log req.body to see if tid and name are present
    const sql = "INSERT INTO appointment (`appointment_id`, `patient_id`,`doctor_id`,`appointment_date`,`appointment_time`,`status`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.appointment_id, req.body.patient_id, req.body.doctor_id, req.body.appointment_date, req.body.appointment_time, req.body.status];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log the specific MySQL error
            return res.json({ Error: "Error in query", Details: err });
        }
        return res.json({ Status: "Success", data: result });
    });
});

app.delete('/delete-appointment/:appointment_id', (req, res) => {
    const sql = "DELETE FROM appointment WHERE appointment_id = ?";
    const appointmentId = req.params.appointment_id;

    db.query(sql, [appointmentId], (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err); // Log MySQL error details
            return res.json({ Error: "Error in delete query", Details: err });
        }
        if (result.affectedRows === 0) {
            return res.json({ Status: "Failed", Message: "No doctor found with the given doctor_id" });
        }
        return res.json({ Status: "Success", Message: "Doctor deleted successfully", data: result });
    });
});


app.delete('/clear-appointments', (req, res) => {
    const sql = "DELETE FROM appointment";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in deletion query" });
        return res.json({ Status: "Success", data: result });
    });
});



app.get('/appointment/:appointmentId', (req, res) => {
    const appointmentId = req.params.appointmentId;

    const query = `
      SELECT 
        appointment_id, 
        patient_id, 
        doctor_id,  
        appointment_date, 
        appointment_time,  
        status 
      FROM appointment 
      WHERE appointment_id = ?`;

    db.query(query, [appointmentId], (err, results) => {
        if (err) {
            console.error('Error fetching appointment:', err.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(results[0]);
    });
});

app.get('/appointment', (req, res) => {
    const { doctor_id, patient_id } = req.query;

    if (!doctor_id || !patient_id) {
        return res.status(400).send('Doctor ID and Patient ID are required');
    }

    const query = `
        CALL GetAppointmentDetails(?, ?);
    `;

    db.query(query, [doctor_id, patient_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (results && results[0]) {
            return res.json(results[0]);
        } else {
            return res.status(404).send('No appointment found');
        }
    });
});


app.get('/appointmentview', (req, res) => {
    const query = `SELECT * FROM AppointmentView`;
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).send('Error fetching appointment data.');
        }
        res.json(results);
    });
});


//billing
app.get('/billing/:billId', (req, res) => {
    const { billId } = req.params;
    const query = 'SELECT * FROM billing WHERE billing_id = ?';

    db.query(query, [billId], (err, result) => {
        if (err) {
            console.error('Error fetching billing details:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Billing record not found' });
        }

        res.json(result[0]);
    });
});


app.get('/billing', (req, res) => {
    const query = 'SELECT * FROM billing';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching billing records:', err.message);
            res.status(500).send('Error fetching billing records');
        } else {
            res.json(results);
        }
    });
});

app.post('/add-billing', (req, res) => {
    const { patient_id, admission_id, total_amount, billing_date, payment_status } = req.body;
    const query = 'INSERT INTO billing (patient_id, admission_id, total_amount, billing_date,payment_status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [patient_id, admission_id, total_amount, billing_date, payment_status], (err, results) => {
        if (err) {
            console.error('Error adding billing record:', err.message);
            res.status(500).send('Error adding billing record');
        } else {
            res.send('Billing record added successfully');
        }
    });
});


app.delete('/delete-billing/:bill_id', (req, res) => {
    const { bill_id } = req.params;
    const query = 'DELETE FROM billing WHERE bill_id = ?';
    db.query(query, [bill_id], (err, results) => {
        if (err) {
            console.error('Error deleting billing record:', err.message);
            res.status(500).send('Error deleting billing record');
        } else {
            res.json({ Message: 'Billing record deleted successfully' });
        }
    });
});

app.delete('/clear-billing', (req, res) => {
    const query = 'TRUNCATE TABLE billing';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error clearing billing table:', err.message);
            res.status(500).send('Error clearing billing table');
        } else {
            res.send('All billing records cleared successfully');
        }
    });
});

app.post("/generate-bill", (req, res) => {
    const { patientId, admissionId } = req.body;

    const sql = `
DELIMITER $$

CREATE PROCEDURE GenerateBill(
    IN patientID INT,
    IN admissionID INT,
    OUT totalAmount DECIMAL(10, 2)
)
BEGIN
    DECLARE roomCharges DECIMAL(10, 2);
    DECLARE treatmentCharges DECIMAL(10, 2);

    SELECT SUM(1000) INTO roomCharges
    FROM Admission
    WHERE admission_id = admissionID;

    SELECT SUM(500) INTO treatmentCharges
    FROM MedicalRecord
    WHERE patient_id = patientID;

    SET totalAmount = COALESCE(roomCharges, 0) + COALESCE(treatmentCharges, 0);

    INSERT INTO Billing (patient_id, admission_id, total_amount, billing_date, payment_status)
    VALUES (patientID, admissionID, totalAmount, CURDATE(), 'Unpaid');
END $$

DELIMITER ;
`;

    db.query(sql, (err) => {
        if (err) {
            console.error("Error creating procedure:", err.message);
        } else {
            console.log("Procedure created successfully!");
        }
    });

});



app.listen(6969, () => {
    console.log("Server running on port 6969");
});
