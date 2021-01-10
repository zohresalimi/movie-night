import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WithProvider } from "../../../mockTestData/data";
import SearchInput from "../";

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider {...props}>
        <SearchInput />
      </WithProvider>
    );
  });

  return component;
}

describe("SearchInput Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container).toMatchSnapshot();
  });
});
