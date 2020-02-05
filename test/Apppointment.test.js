import React from "react";
import ReactDOM from "react-dom";
import { Appointment } from "../src/Appointment";

describe("Appointment", () => {
  let container;
  let customer;
  it("renders the customer first name", () => {
    customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    container = document.createElement("div");
    ReactDOM.render(component, container);
    expect(container.textContent).toMatch("Ashley");
  });
  it("renders another customer first name", () => {
    customer = { firstName: "Jordan" };
    const component = <Appointment customer={customer} />;
    container = document.createElement("div");
    ReactDOM.render(component, container);
    expect(container.textContent).toMatch("Jordan");
  });
});
