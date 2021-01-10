import * as React from "react";
import { act, render } from "@testing-library/react";

import WatchLaterPage from "../";
import { getTestState, WithProvider } from "../../../mockTestData/data";

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider {...props}>
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

  test("shows message with icon if watch list is empty", async () => {
    const testState = getTestState();
    const { container } = await renderWrapper({
      defaultValue: {
        ...testState,
        watchLaterList: {},
      },
    });

    expect(container).toMatchSnapshot();
  });
});
