import { useEffect, useState } from "react";

const ScheduleAppointment = () => {
  const [availableTime, setAvailableTime] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    setDoctors([
      { id: 1, name: "Jake" },
      { id: 2, name: "Jane" },
    ]);
    setAvailableTime(["9:30 AM", "10:00 AM"]);
  }, []);

  return (
    <>
      <h2 className="title center mt-6">Schedule Appointment</h2>

      <div className="w-800 m-auto">
        <div className="input">
          <label htmlFor="doctor" className="text-default mt-3">
            Doctor
          </label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="" hidden>
              Please select doctor
            </option>
            {doctors.map((doctor) => (
              <option key={`doctor-${doctor.id}`} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input">
          <label htmlFor="appointmentDate" className="text-default mt-3">
            Appointment Date
          </label>
          <input
            id="appointmentDate"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="appointmentTime" className="text-default mt-3">
            Appointment Time
          </label>
          <select
            id="appointmentTime"
            disabled={!!!availableTime}
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          >
            <option value="" hidden>
              Please select time
            </option>
            {availableTime.map((aTime, index) => (
              <option key={`time-${index}`} value={aTime}>
                {aTime}
              </option>
            ))}
          </select>
        </div>

        <div className="center">
          <button type="submit">Submit Appointment</button>
        </div>
      </div>
    </>
  );
};

export default ScheduleAppointment;
