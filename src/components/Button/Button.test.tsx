import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

describe("Button", () => {
  test("ボタンテキストが表示される", () => {
    render(<Button>ボタン</Button>);
    expect(screen.getByText("ボタン")).toBeInTheDocument();
  });
});
