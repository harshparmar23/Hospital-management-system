-- Create table for Departments
CREATE TABLE Department (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Create table for Doctors
CREATE TABLE Doctor (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

-- Create table for Patients
CREATE TABLE Patient (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    dob DATE,
    gender ENUM('Male', 'Female', 'Other'),
    phone VARCHAR(15),
    email VARCHAR(100),
    address TEXT,
    blood_type VARCHAR(3)
);

-- Create table for Appointments
CREATE TABLE Appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

-- Create table for Medical Records
CREATE TABLE MedicalRecord (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    diagnosis TEXT,
    treatment TEXT,
    record_date DATE,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

-- Create table for Rooms
CREATE TABLE Room (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) NOT NULL,
    room_type ENUM('General', 'ICU', 'Private'),
    availability BOOLEAN DEFAULT TRUE
);

-- Create table for Admissions
CREATE TABLE Admission (
    admission_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    room_id INT,
    admission_date DATE,
    discharge_date DATE,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (room_id) REFERENCES Room(room_id)
);

-- Create table for Billing
CREATE TABLE Billing (
    billing_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    admission_id INT,
    total_amount DECIMAL(10, 2),
    billing_date DATE,
    payment_status ENUM('Paid', 'Unpaid') DEFAULT 'Unpaid',
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (admission_id) REFERENCES Admission(admission_id)
);

-- Insert sample data
INSERT INTO Department (name, description) VALUES 
    ('Cardiology', 'Heart and blood vessel treatment'),
    ('Neurology', 'Brain and nerve treatment'),
    ('Orthopedics', 'Bone and muscle treatment');

INSERT INTO Doctor (name, specialty, phone, email, department_id) VALUES 
    ('Dr. John Smith', 'Cardiologist', '123-456-7890', 'jsmith@hospital.com', 1),
    ('Dr. Susan Brown', 'Neurologist', '098-765-4321', 'sbrown@hospital.com', 2),
    ('Dr. Alice White', 'Orthopedic Surgeon', '555-555-5555', 'awhite@hospital.com', 3);

INSERT INTO Room (room_number, room_type, availability) VALUES 
    ('101', 'General', TRUE),
    ('102', 'ICU', TRUE),
    ('201', 'Private', TRUE);

-- Query to join some of the tables (example):
SELECT 
    Patient.name AS patient_name,
    Doctor.name AS doctor_name,
    Appointment.appointment_date,
    Appointment.appointment_time
FROM 
    Appointment
JOIN Patient ON Appointment.patient_id = Patient.patient_id
JOIN Doctor ON Appointment.doctor_id = Doctor.doctor_id
WHERE 
    Appointment.status = 'Scheduled';
