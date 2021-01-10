import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NavBar from "../";

jest.mock("../../../components/NavBarMobile", () => (props) => (
  <div visible={props.visible.toString()}>Navbar Mobile</div>
));

jest.mock("../../../components/NavBarDesktop", () => () => (
  <div>Navbar Desktop</div>
));

describe("NavBar Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });

  test("match snapshot if visible is true", async () => {
    const setState = jest.fn();
    jest.spyOn(React, "useState").mockImplementation(() => [true, setState]);
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });
});
