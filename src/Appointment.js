import React from "react";
export const Appointment = ({ customer: { firstName } }) => (
  <div>{firstName}</div>
);

export const AppointmentsDayView = ({ appointments }) => (
  <div id="appointmentsDayView">
    <ol>
      {appointments.map(appointments => (
        <div key={appointments.startsAt} />
      ))}
    </ol>
  </div>
);
