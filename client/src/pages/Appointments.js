import moment from "moment";

const appointments = [
  { id: 1, scheduleDate: new Date(), reason: "test reason", note: "test note" },
  {
    id: 2,
    scheduleDate: new Date("06/18/2022 09:30 PM"),
    reason: "test reason",
    note: "test note",
  },
];

const Appointments = () => {
  return (
    <>
      <div className="end">
        <button className="btn-appointment">Book Appointment</button>
      </div>

      <h2 className="title center">Appointment History</h2>

      {appointments.map((appointment) => (
        <div className="container">
          <div key={appointment.id}>
            <div className="date">{`${moment(appointment.scheduleDate).format(
              "MMMM d, yyyy"
            )} at ${moment(appointment.startDate).format("h:mm A")}`}</div>
            <div className="content">
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
