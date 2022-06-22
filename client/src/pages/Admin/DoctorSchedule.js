import { useState } from "react";
import { CheckCalendar } from "react-check-calendar";
import moment from "moment";
import "react-check-calendar/dist/index.css";

const DoctorSchedule = () => {
  const [selected, setSelected] = useState([]);
  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6]);

  const nextWeek = moment().add(1, "week");
  const prevWeek = moment().subtract(1, "week");
  const currentWeek = moment();
  const intervals = [
    { start: 8, end: 8.5 },
    { start: 8.5, end: 9 },
    { start: 9, end: 9.5 },
    { start: 9, end: 9.5 },
    { start: 9.5, end: 10 },
    { start: 10, end: 10.5 },
    { start: 10.5, end: 11 },
    { start: 11, end: 11.5 },
    { start: 11.5, end: 12 },
    { start: 12, end: 12.5 },
    { start: 12.5, end: 13 },
    { start: 13, end: 13.5 },
    { start: 13.5, end: 14 },
    { start: 14, end: 14.5 },
    { start: 14.5, end: 15 },
    { start: 15, end: 15.5 },
  ];

  const updateDays = (value) => {
    console.log(days);
    if (days.find((x) => x === value)) {
      setDays(days.filter((x) => x !== value));
      return;
    }

    setDays([...days, value]);
  };

  return (
    <>
      <h2 className="title center">Update Available Schedule</h2>

      <div className="mt-3 w-800 m-auto">
        <div className="input">
          <label>Days</label>
          <div className="input-group">
            <input
              type="checkbox"
              value={1}
              id="mon"
              onChange={(e) => updateDays(+e.target.value)}
            />{" "}
            <label htmlFor="mon">Mon</label>
            <input
              type="checkbox"
              value={2}
              id="tue"
              onChange={(e) => updateDays(+e.target.value)}
            />{" "}
            <label htmlFor="tue">Tue</label>
            <input
              type="checkbox"
              value={3}
              id="wed"
              onChange={(e) => updateDays(+e.target.value)}
            />{" "}
            <label htmlFor="wed">Wed</label>
            <input
              type="checkbox"
              value={4}
              id="thu"
              onChange={(e) => updateDays(+e.target.value)}
            />{" "}
            <label htmlFor="thu">Thu</label>
            <input
              type="checkbox"
              value={5}
              id="fri"
              onChange={(e) => updateDays(+e.target.value)}
            />{" "}
            <label htmlFor="fri">Fri</label>
            <input
              type="checkbox"
              value={6}
              id="sat"
              onChange={(e) => updateDays(e.target.value)}
            />{" "}
            <label htmlFor="sat">Sat</label>
            <input
              type="checkbox"
              value={7}
              id="sun"
              onChange={(e) => updateDays(e.target.value)}
            />{" "}
            <label htmlFor="sun">Sun</label>
          </div>
        </div>
        <div className="input">
          <label>Hours</label>
          <div className="input-group">
            <label>From</label>
            <select id="from"></select>
            <label>To</label>
            <select id="to"></select>
          </div>
        </div>
      </div>

      <div className="w-800 m-auto">
        <CheckCalendar
          checkedDates={selected}
          onChange={({ moments, dates }) => setSelected(moments)}
          min={currentWeek}
          disableAfter={nextWeek}
          disableBefore={prevWeek}
          hideDays={days}
          hoursIntervals={intervals}
          datesFormats={{
            fromHour: "[<strong>]h:mm a[</strong>]",
            toHour: " [to] [<strong>]h:mm a[</strong>]",
          }}
        />
      </div>
    </>
  );
};

export default DoctorSchedule;
