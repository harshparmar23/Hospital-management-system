use miniproject;

select * from doctor;	
select * from department;
select * from room;
select * from appointment;
select * from billing;
select * from admission;
select * from admission;


desc doctor;
desc patient;
desc medicalrecord;
desc room;
desc appointment;
desc billing;

drop table table1;
drop table medicalrecord;

DELIMITER $$

CREATE TRIGGER update_appointment_status_after_date
AFTER UPDATE ON Appointment
FOR EACH ROW
BEGIN
    -- Check if the appointment date has passed and the status is still 'Scheduled'
    IF NEW.appointment_date < CURRENT_DATE AND NEW.status = 'Scheduled' THEN
        UPDATE Appointment
        SET status = 'Completed'
        WHERE appointment_id = NEW.appointment_id;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER cancel_appointments_on_doctor_delete
AFTER DELETE ON Doctor
FOR EACH ROW
BEGIN
    -- Set the status of all appointments to 'Cancelled' if the doctor is deleted
    UPDATE Appointment
    SET status = 'Cancelled'
    WHERE doctor_id = OLD.doctor_id
    AND status = 'Scheduled';  -- Only cancel scheduled appointments
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE UpdateRoomAvailability(IN room_number VARCHAR(10), IN availability BOOLEAN)
BEGIN
    UPDATE Room
    SET availability = availability
    WHERE room_number = room_number;
END $$

DELIMITER ;



DROP PROCEDURE UpdateRoomAvailability;

CALL GenerateBill(1, 1, @totalAmount);
SELECT @totalAmount;

DELIMITER $$
CREATE PROCEDURE GetAppointmentDetails(
    IN doctorID INT,
    IN patientID INT
)
BEGIN
    -- Declare variables to hold the result
    -- DECLARE appointment_id INT;
--     DECLARE appointment_date DATE;
--     DECLARE status VARCHAR(50);

    -- Fetch the appointment details matching doctor_id and patient_id
    -- SELECT appointment_id, appointment_date, status
--     INTO appointment_id, appointment_date, status
--     FROM appointment
--     WHERE doctor_id = doctor_id AND patient_id = patient_id
--     LIMIT 1;  -- Assuming there is only one appointment per patient and doctor pair

    -- Return the results (if needed, you can adjust to return as an output parameter or handle differently in your DBMS)
--     SELECT appointment_id AS 'Appointment ID', appointment_date AS 'Appointment Date', status AS 'Status';
		select appointment_id, appointment_date from appointment where doctor_id = doctorID and patient_id= patientID ;
END $$
DELIMITER ;

drop procedure GetAppointmentDetails;

CALL GetAppointmentDetails(2, 2);


CREATE VIEW RoomView AS
SELECT 
    room_id,
    room_number,
    room_type,
    CASE 
        WHEN availability = 1 THEN 'Available' 
        ELSE 'Unavailable' 
    END AS availability_status
FROM Room;

CREATE VIEW AppointmentView AS
SELECT 
    a.appointment_id,
    a.appointment_date,
    a.appointment_time,
    a.status,
    p.name AS patient_name,
    d.name AS doctor_name
FROM Appointment a
JOIN patient p ON p.patient_id = a.patient_id
JOIN doctor d ON d.doctor_id = a.doctor_id;

drop view AppointmentView;

