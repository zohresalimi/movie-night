import * as React from "react";
import { act, render } from "@testing-library/react";

import WatchLaterPage from "../";
import { WithProvider } from "../../../mockTestData/data";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <WatchLaterPage />
      </WithProvider>
    );
  });

  return component;
}

describe("WatchLater Page Component Testing", () => {
  test("loads items", async () => {
    const { container, getByTestId } = await renderWrapper();
    expect(getByTestId("watch-later-page-wrapper")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
