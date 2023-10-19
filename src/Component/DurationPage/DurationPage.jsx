import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./DurationPage.css";

const DurationPage = () => {
  const [durations, setDurations] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const location = useLocation();
  const selectedRoom = new URLSearchParams(location.search).get("room");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "http://api.internship.appointy.com:8000/space-payload/v1/durations",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDIzLTA4LTEwVDAwOjAwOjAwWiIsInVzZXJfaWQiOjI5fQ.vGb6NBHX_k0ftBdkwnufZdouA3oA7hQAdw9ei8ssfGQ", // Replace with your access token
          },
        }
      )
      .then((response) => {
        setDurations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching durations:", error);
      });
  }, []);

  const handleDurationSelection = (seconds) => {
    setSelectedDuration(seconds);
  };
  const handleNextButtonClick = () => {
    if (selectedDuration) {
      navigate(`/seats?room=${selectedRoom}&duration=${selectedDuration}`);
    } else {
      alert("Please select a duration before proceeding to the next page.");
    }
  };

  return (
    <div className="container">
      <p className="selected-room">Selected Room: {selectedRoom}</p>
      <h1>Select Duration</h1>
      <ul>
        {durations.map((duration) => (
          <li key={duration.seconds}>
            <input
              type="radio"
              id={duration.seconds}
              name="duration"
              value={duration.seconds}
              checked={selectedDuration === duration.seconds}
              onChange={() => handleDurationSelection(duration.seconds)}
            />
            <label htmlFor={duration.seconds}>
              {duration.seconds / 60} minutes
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNextButtonClick}>Next</button>
      {selectedDuration && (
        <p className="selected-room">
          Selected Duration: {selectedDuration / 60} min.
        </p>
      )}
    </div>
  );
};

export default DurationPage;
