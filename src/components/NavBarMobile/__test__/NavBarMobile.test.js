import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NavBarMobile from "../";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <Router>
        <NavBarMobile />
      </Router>
    );
  });

  return component;
}

describe("NavBarMobile Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container).toMatchSnapshot();
  });

  test("match snapshot if active item is changed", async () => {
    const { container, getByTestId } = await renderWrapper();
    const menuItem = getByTestId("watch-later");
    fireEvent.click(menuItem, { target: { innerText: "Watch Later" } });
    expect(container).toMatchSnapshot();
  });
});
