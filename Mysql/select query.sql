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

CREATE PROCEDURE UpdateRoomAvailability(IN roomId INT, IN avail BOOLEAN)
BEGIN
    UPDATE Room
    SET avail = availability
    WHERE roomId = room_number;
END$$

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

