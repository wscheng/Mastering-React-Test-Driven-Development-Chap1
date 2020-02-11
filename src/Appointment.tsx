import * as React from "react";
import { useState } from "react";
import tmpX from "./tmp";

interface I_props_Customer {
  firstName: string;
}

interface Appointment {
  startsAt: number;
  customer: I_props_Customer;
}

interface I_props_Appointment {
  appointment: Appointment;
}

export const Appointment = ({ appointment }: I_props_Appointment) => (
  <div>
    <div>{appointmentTimeOfDay(appointment.startsAt)}</div>
    <div>{appointment.customer.firstName}</div>
  </div>
);

const appointmentTimeOfDay = (startsAt: number) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

export const AppointmentsDayView: React.FC<{
  appointments: Appointment[];
}> = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today. {tmpX}</p>
      ) : (
        <Appointment appointment={appointments[selectedAppointment]} />
      )}
    </div>
  );
};
