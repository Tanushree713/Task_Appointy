import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const SlotsPage = () => {
  const location = useLocation();

  const duration = new URLSearchParams(location.search).get("duration");
  const seats = new URLSearchParams(location.search).get("seats");
  const selectedDate = new URLSearchParams(location.search).get("date");

  const [workingHours, setWorkingHours] = useState([]);
  const [blockedHours, setBlockedHours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const payloadNameToId = {
    RAMBHA: "pyl_1",
    ChaSTE: "pyl_2",
    LRA: "pyl_3",
  };

  const selectedPayloadName = new URLSearchParams(location.search).get("room");
  const selectedPayloadId = payloadNameToId[selectedPayloadName];
  
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDIzLTA4LTEwVDAwOjAwOjAwWiIsInVzZXJfaWQiOjI5fQ.vGb6NBHX_k0ftBdkwnufZdouA3oA7hQAdw9ei8ssfGQ"
  useEffect(() => {

    Promise.all([
      fetchWorkingHours(),
      fetchBlockedHours(),
      fetchBookings(),
    ]).then(([workingHoursData, blockedHoursData, bookingsData]) => {
      setWorkingHours(workingHoursData);
      setBlockedHours(blockedHoursData);
      setBookings(bookingsData);
      calculateAvailableSlots(workingHoursData, blockedHoursData, bookingsData);
    }).catch((err) => {
        console.log("err" , err)
    });
  }, []);

  console.log("working",workingHours) ;
  console.log("blocking" , blockedHours) ;

  const fetchWorkingHours = () => {
    return axios.get(
      "http://api.internship.appointy.com:8000/space-payload/v1/working-hours",
      {
        params: {
          payloadId: selectedPayloadId,
          startTime: selectedDate,
          endTime: selectedDate,
        },
        headers: {
          Authorization:token,
        },
      }
    );
  };

  const fetchBlockedHours = () => {
    return axios.get(
      "http://api.internship.appointy.com:8000/space-payload/v1/block-hours",
      {
        params: {
   
            payloadId: selectedPayloadId,
            startTime: selectedDate,
            endTime: selectedDate,
          },
          headers: {
            Authorization:token,
          },
      }
    );
  };

  const fetchBookings = () => {
    return axios.get(
      "http://api.internship.appointy.com:8000/space-payload/v1/bookings",
      {
        params: {
   
            payloadId: selectedPayloadId,
            startTime: selectedDate,
            endTime: selectedDate,
          },
          headers: {
            Authorization:token,
          },
      }
    );
  };

  function calculateAvailableSlots(workingHours, blockedHours, bookings) {

    const availableSlots = [];

    if (workingHours.length === 0) {
      availableSlots.push({
        start_time: selectedDate,
        end_time: selectedDate,
      });
      return availableSlots;
    }

    for (const workingHour of workingHours) {
      const { start_time: workingStart, end_time: workingEnd } = workingHour;

      const slotsWithinHour = getSlotsWithinHour(
        workingStart,
        workingEnd,
        blockedHours,
        bookings
      );

      availableSlots.push(...slotsWithinHour);
    }

    return availableSlots;
  }

  function getSlotsWithinHour(
    workingStart,
    workingEnd,
    blockedHours,
    bookings
  ) {

    const slotsWithinHour = [];

 
    let currentTime = workingStart;
    while (currentTime < workingEnd) {

      const isBlocked = isTimeBlocked(currentTime, blockedHours);

   
      const isBooked = isTimeBooked(currentTime, bookings);

     
      if (!isBlocked && !isBooked) {
        slotsWithinHour.push({
          start_time: currentTime,
          end_time: incrementTime(currentTime, duration), 
        });
      }

  
      currentTime = incrementTime(currentTime, 30);
    }

    return slotsWithinHour;
  }

  function isTimeBlocked(currentTime, blockedHours) {
   
    return blockedHours.some((blockedHour) => {
      const { start_time: blockedStart, end_time: blockedEnd } = blockedHour;
      return currentTime >= blockedStart && currentTime < blockedEnd;
    });
  }

  function isTimeBooked(currentTime, bookings) {
    
    return bookings.some((booking) => {
      const { start_time: bookingStart, end_time: bookingEnd } = booking;
      return currentTime >= bookingStart && currentTime < bookingEnd;
    });
  }

  function incrementTime(currentTime, minutes) {

    const newTime = new Date(currentTime);
    newTime.setMinutes(newTime.getMinutes() + minutes);
    return newTime;
  }

  return (
    <div className="container">
      <h1>Available Slots</h1>
      <p className="selected-room">Room: {selectedPayloadName}</p>
      <p className="selected-room">Duration: {duration /60}min.</p>
      <p className="selected-room">Seats: {seats}</p>
      <p className="selected-room">Date: {selectedDate}</p>
      <ul>
        {availableSlots.map((slot) => (
          <li key={slot.id}>
            {slot.start_time} - {slot.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlotsPage;
