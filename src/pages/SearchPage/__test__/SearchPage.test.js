import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchPage from "../";

jest.mock("../../../components/SearchInput", () => () => (
  <div>SearchInpput Component</div>
));

jest.mock("../../../components/MovieList", () => () => (
  <div>MovieList Component</div>
));

describe("Search Page Component Testing", () => {
  test("loads items", async () => {
    const { container } = await render(<SearchPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
