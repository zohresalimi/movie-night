import * as React from "react";
import { act, render } from "@testing-library/react";

import FavoritePage from "..";
import { WithProvider, getTestState } from "../../../mockTestData/data";

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider {...props}>
        <FavoritePage />
      </WithProvider>
    );
  });

  return component;
}

describe("Favorite Page Component Testing", () => {
  test("loads items", async () => {
    const { container, getByTestId } = await renderWrapper();
    expect(getByTestId("favorite-page-wrapper")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("shows message with icon if favorite list is empty", async () => {
    const testState = getTestState();
    const { container } = await renderWrapper({
      defaultValue: {
        ...testState,
        favoriteList: {},
      },
    });

    expect(container).toMatchSnapshot();
  });
});
