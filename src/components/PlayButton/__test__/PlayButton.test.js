import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PlayButton from "../";

describe("PlayButton Component Testing", () => {
  test("take snapshot", async () => {
    const { container, getByTestId } = await render(<PlayButton />);
    expect(getByTestId("play-btn")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("check setPlayVideo should be called", async () => {
    const mockSetPlayVideo = jest.fn(() => true);
    const { getByTestId } = await render(
      <PlayButton setPlayVideo={mockSetPlayVideo} />
    );
    fireEvent.click(getByTestId("play-btn"));
    expect(mockSetPlayVideo).toHaveBeenCalled();
  });
});
