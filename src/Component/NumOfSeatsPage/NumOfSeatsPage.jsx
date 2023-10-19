import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NumOfSeatsPage.css";

const NumOfSeatsPage = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const location = useLocation();
  const selectedRoom = new URLSearchParams(location.search).get("room");
  const selectedDuration = new URLSearchParams(location.search).get("duration");

  const navigate = useNavigate();

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleNextButtonClick = () => {
    if (selectedSeat !== null) {
      navigate(
        `/date?room=${selectedRoom}&duration=${selectedDuration}&seats=${selectedSeat}`
      );
    } else {
      alert("Please select a seat before proceeding to the next page.");
    }
  };

  return (
    <div className="container">
      <p className="selected-room">Selected Room: {selectedRoom}</p>
      <p className="selected-room">
        Selected Duration: {selectedDuration / 60} min.
      </p>
      <h1>Number of Seats Selection</h1>
      <ul className="seat-list">
        {Array.from({ length: 20 }, (_, i) => (
          <li
            key={i + 1}
            className={`seat ${selectedSeat === i + 1 ? "selected" : ""}`}
            onClick={() => handleSeatSelection(i + 1)}
          >
            {i + 1}
          </li>
        ))}
      </ul>
      {selectedSeat !== null && (
        <p className="selected-room">Selected Seat: {selectedSeat}</p>
      )}
      <button onClick={handleNextButtonClick}>Next</button>
    </div>
  );
};

export default NumOfSeatsPage;
