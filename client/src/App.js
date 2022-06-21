import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./Layout";
import jwt from "jwt-decode";

import "./App.css";
import Appointments from "./pages/Appointments";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import AppointmentConfirm from "./pages/AppointmentConfirm";
import Schedule from "./pages/Admin/Schedule";
import Doctors from "./pages/Admin/Doctors";
import AddNote from "./pages/Admin/AddNote";
import { Axios } from "axios";

function App() {
  const [appointmentsList, setAppointmentsList] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.length("http://localhost:3001/api/appointments").then((response) => {
      setAppointmentsList(response.data);
    });

    const currentToken = sessionStorage.getItem("token");

    setSignedIn(!!currentToken);
    if (currentToken) {
      setToken(currentToken);
        let user = jwt(currentToken);
        setUser(user || {});
    }
  }, []);

  Axios.interceptors.request.use((request) => {
    if (signedIn) {
      console.log("token")
      request.headers.common.Authorization = `Bearer ${token}`;
    }
    return request;
  })

  const updateSignedInStatus = (value, data) => {
    setSignedIn(value);

    if (value) {
      let user = jwt(data);
      setUser(user);
      setToken(data);
      sessionStorage.setItem("token", data);
      return;
    }

    sessionStorage.removeItem("token");
    setToken(null);
    setUser(data);
    navigate("/login");
  };

  const updateAppointmentsList = (appointments) => {
    let data = [...appointmentsList.filter((a) => a.id !== appointments.id), appointments];
    data = data.sort((a, b) => a.id - b.id);
    setAppointmentsList(data);
  };

  return (
    <Routes>
      <Route path="/login" 
        element={
          <Login 
            signedIn={signedIn} 
            onUpdate={updateSignedInStatus} 
          />
        } 
      />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={
          <Layout 
            signedIn={signedIn} 
            onUpdate={updateSignedInStatus}
            onLogout={updateSignedInStatus}
          />
        }
      >
        <Route index element={
            <Appointments 
              signedIn={signedIn}
              appointmentsList={appointmentsList}
              user={user}
            />
          } 
        />
        <Route path="book-appointment" element={<ScheduleAppointment />} />
        <Route paht="appointment-confirmed" element={<AppointmentConfirm />} />
        <Route path="admin/doctors" element={<Doctors />} />
        <Route path="admin/patients/:id/note" element={<AddNote />} />
        <Route path="admin/schedules" element={<Schedule />} />
      </Route>
    </Routes>
  );
}

export default App;
