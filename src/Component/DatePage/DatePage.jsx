import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DatePage.css";

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const location = useLocation();
  const selectedRoom = new URLSearchParams(location.search).get("room");
  const selectedDuration = new URLSearchParams(location.search).get("duration");
  const selectedSeat = new URLSearchParams(location.search).get("seats");
  const navigate = useNavigate();

  const today = formatDate(new Date());

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleNextClick = () => {
    navigate(
      `/slots?room=${selectedRoom}&duration=${selectedDuration}&seats=${selectedSeat}&date=${selectedDate}`
    );
  };

  return (
    <div className="container">
      <p className="selected-room">Selected Room: {selectedRoom}</p>
      <p className="selected-room">
        Selected Duration: {selectedDuration / 60}min.
      </p>
      <p className="selected-room">Selected Seats: {selectedSeat}</p>
      <h1>Calendar Page</h1>

      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        min={today}
        onChange={handleDateChange}
      />
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default CalendarPage;
