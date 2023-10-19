import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PayloadPage.css";

const PayloadPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "http://api.internship.appointy.com:8000/space-payload/v1/payloads",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDIzLTA4LTEwVDAwOjAwOjAwWiIsInVzZXJfaWQiOjI5fQ.vGb6NBHX_k0ftBdkwnufZdouA3oA7hQAdw9ei8ssfGQ",
          },
        }
      );
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleRoomSelection = (roomName) => {
    setSelectedRoom(roomName);
  };

  const handleNextButtonClick = () => {
    if (selectedRoom) {
      navigate(`/duration?room=${selectedRoom}`);
    } else {
      alert("Please select a room before proceeding to the next page.");
    }
  };

  return (
    <div className="container">
      <h1>List of Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <input
              type="radio"
              id={room.id}
              name="room"
              value={room.name}
              checked={selectedRoom === room.name}
              onChange={() => handleRoomSelection(room.name)}
            />
            <label htmlFor={room.id}>{room.name}</label>
          </li>
        ))}
      </ul>
      <button onClick={handleNextButtonClick}>Next</button>
      {selectedRoom && (
        <p className="selected-room">Selected Room: {selectedRoom}</p>
      )}
    </div>
  );
};

export default PayloadPage;
