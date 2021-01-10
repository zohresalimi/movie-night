import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getTestState, WithProvider } from "../../../mockTestData/data";
import MovieList from "../";

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider {...props}>
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

  test("should match snapshot if result is empty", async () => {
    const testState = getTestState();
    const { container } = await renderWrapper({
      defaultValue: {
        ...testState,
        movies: {},
      },
    });

    expect(container).toMatchSnapshot();
  });
});
