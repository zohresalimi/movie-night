import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NavBarDesktop from "../";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <Router>
        <NavBarDesktop />
      </Router>
    );
  });

  return component;
}

describe("NavBarDesktop Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container).toMatchSnapshot();
  });

  test("match snapshot if active item is changed", async () => {
    const { container, getByTestId } = await renderWrapper();
    const menuItem = getByTestId("favorites");
    fireEvent.click(menuItem);
    expect(container).toMatchSnapshot();
  });
});
