import { render } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import DashboardCard from "../DashboardCard";

describe("DashboardCard", () => {
  it("will match snapshot", () => {
    const component = render(
      <Router>
        <DashboardCard />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });
});