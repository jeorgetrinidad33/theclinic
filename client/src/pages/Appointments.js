import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const appointments = [
  { id: 1, 
    scheduleDate: new Date("06/29/2022 08:30 AM"), 
    doctor: "Math D. Hatter",
    reason: "test reason", 
    note: "test note" },
  {
    id: 2,
    scheduleDate: new Date("06/18/2022 09:30 AM"),
    doctor: "Michael Green",
    reason: "test reason",
    note: "test note",
  },
];

function Appointments() {
  const navigate = useNavigate();

  return (
    <>
      <div className="end">
        <button className="btn-appointment" onClick={() => navigate("/book-appointment")}>Book Appointment</button>
      </div>

      <h2 className="title center">Appointment History</h2>

      {appointments.map((appointment) => (
        <div className="container">
          <div key={appointment.id}>
            <div className="date">{`${moment(appointment.scheduleDate).format(
              "MMMM D, yyyy"
            )} at ${moment(appointment.scheduleDate).format("h:mm A")}`}</div>
            <div className="content">
            <p>
                <b>Doctor:</b> {appointment.doctor}
              </p>
              <p>
                <b>Reason:</b> {appointment.reason}
              </p>
              <p>
                <b>Notes:</b> {appointment.note}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Appointments;
