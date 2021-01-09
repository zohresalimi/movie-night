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

describe.only("WatchLater Page Component Testing", () => {
  test("loads items", async () => {
    const { container } = await renderWrapper();
    expect(container).toMatchSnapshot();
  });
});
