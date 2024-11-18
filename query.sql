create database miniproject;
use miniproject;

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



-- Create table for Rooms
CREATE TABLE Room (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) NOT NULL,
    room_type ENUM('General', 'ICU', 'Private'),
    availability BOOLEAN DEFAULT TRUE
);

drop table Room;

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

-- Insert sample data into Department
INSERT INTO Department (name, description) VALUES
('Cardiology', 'Heart and blood vessel treatment'),
('Neurology', 'Brain and nerve treatment'),
('Orthopedics', 'Bone and muscle treatment'),
('Psychiatry', 'Focuses on mental health'),
('Pediatrics', 'Focuses on the health of infants, children, and adolescents'),
('Oncology', 'Deals with the prevention, diagnosis, and treatment of cancer');

-- Insert sample data into Doctor
INSERT INTO Doctor (name, specialty, phone, email, department_id) VALUES
('Dr. John Smith', 'Cardiologist', '123-456-7890', 'john.smith@hospital.com', 1),
('Dr. Susan Brown', 'Neurologist', '234-567-8901', 'susan.brown@hospital.com', 2),
('Dr. Alice White', 'Orthopedic Surgeon', '345-678-9012', 'alice.white@hospital.com', 3);

-- Insert sample data into Patient
INSERT INTO Patient (name, dob, gender, phone, email, address, blood_type) VALUES
('Alice Green', '1985-03-15', 'Female', '456-789-0123', 'alice.green@gmail.com', '123 Main Street, Cityville', 'O+'),
('Bob Johnson', '1990-07-22', 'Male', '567-890-1234', 'bob.johnson@gmail.com', '456 Elm Street, Townsville', 'A-'),
('Charlie Lee', '2000-01-10', 'Other', '678-901-2345', 'charlie.lee@gmail.com', '789 Pine Avenue, Villagetown', 'B+');

-- Insert sample data into Appointment
INSERT INTO Appointment (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES
(1, 1, '2024-11-15', '10:30:00', 'Scheduled'),
(2, 2, '2024-11-16', '11:00:00', 'Completed'),
(3, 3, '2024-11-17', '14:30:00', 'Cancelled');

-- Insert sample data into MedicalRecord
INSERT INTO MedicalRecord (patient_id, doctor_id, diagnosis, treatment, record_date) VALUES
(1, 1, 'Hypertension', 'Lifestyle changes and medication', '2024-11-01'),
(2, 2, 'Migraine', 'Pain relief medication and rest', '2024-11-02'),
(3, 3, 'Fractured Arm', 'Surgery and physiotherapy', '2024-11-03');

-- Insert sample data into Room
INSERT INTO Room (room_number, room_type, availability) VALUES
('101', 'General', TRUE),
('102', 'ICU', FALSE),
('103', 'Private', TRUE);

-- Insert sample data into Admission
INSERT INTO Admission (patient_id, room_id, admission_date, discharge_date) VALUES
(1, 2, '2024-11-10', '2024-11-13'),
(2, 1, '2024-11-11', NULL),
(3, 3, '2024-11-12', NULL);

-- Insert sample data into Billing
INSERT INTO Billing (patient_id, admission_id, total_amount, billing_date, payment_status) VALUES
(1, 1, 1500.00, '2024-11-13', 'Paid'),
(2, 2, 3000.00, '2024-11-14', 'Unpaid'),
(3, 3, 5000.00, '2024-11-14', 'Unpaid');




TRUNCATE  table Department;
drop table Doctor;

DROP DATABASE miniproject;
