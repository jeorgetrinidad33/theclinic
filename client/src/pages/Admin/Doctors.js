import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/doctor")
      .then((res) => {
        setDoctors(res.data);
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <>
      <div className="end">
        <button className="btn" onClick={() => navigate("/admin/doctors/add")}>
          Add Doctor
        </button>
      </div>

      <h1 className="title center">Doctor List</h1>

      <div className="card w-800 m-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="row">Name</th>
              <th scope="row">Email</th>
              <th scope="row">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.length === 0 && (
              <tr>
                <th colspan="3" className="center">
                  No records found.
                </th>
              </tr>
            )}
            {doctors &&
              doctors.map((doctor) => (
                <tr>
                  <th scope="row">{doctor.name}</th>
                  <td>{doctor.email}</td>
                  <td>
                    <button
                      className="action"
                      onClick={() =>
                        navigate(`/admin/doctors/${doctor.id}/schedule`)
                      }
                    ></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Doctors;
