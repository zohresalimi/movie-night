import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WithProvider } from "../../../mockTestData/data";
import CardItem from "../";

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider {...props}>
        <CardItem item={{ id: "" }} />
      </WithProvider>
    );
  });

  return component;
}

describe("CardItem Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container).toMatchSnapshot();
  });
});
