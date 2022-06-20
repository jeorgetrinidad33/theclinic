import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./Layout";

import "./App.css";
import Appointments from "./pages/Appointments";
import ScheduleAppointment from "./pages/ScheduleAppointment";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Appointments />} />
        <Route path="book-appointment" element={<ScheduleAppointment />} />
      </Route>
    </Routes>
  );
}

export default App;
