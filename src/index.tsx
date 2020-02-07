import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppointmentsDayView } from "./Appointment";
import { sampleAppointments } from "./sampleData";

ReactDOM.render(
  <AppointmentsDayView appointments={sampleAppointments} />,
  document.getElementById("root")
);
