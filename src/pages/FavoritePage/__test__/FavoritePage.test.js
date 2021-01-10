import * as React from "react";
import { act, render } from "@testing-library/react";

import FavoritePage from "..";
import { WithProvider } from "../../../mockTestData/data";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
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
});
