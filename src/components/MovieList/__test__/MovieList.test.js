import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WithProvider } from "../../../mockTestData/data";
import MovieList from "../";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <MovieList />
      </WithProvider>
    );
  });

  return component;
}

describe("MovieList Component Testing", () => {
  test("take snapshot", async () => {
    const { container, getByTestId } = await renderWrapper();
    expect(getByTestId("watch-list-wrapper")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
