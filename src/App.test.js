import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

describe("Board component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
  it("should render 3 rows",()=>{
    const board = render(<App />);
    const row0 = board.getByTestId("board-row0");
    const row1 = board.getByTestId("board-row1");
    const row2 = board.getByTestId("board-row2");
    expect(row0).toBeInTheDocument();
    expect(row1).toBeInTheDocument();
    expect(row2).toBeInTheDocument();
  });
  it("should render 9 null squares",()=>{
    const board = render(<App />);
    const square0 = board.getByTestId("square0");
    expect(square0).toHaveTextContent("");
    const square1 = board.getByTestId("square1");
    expect(square1).toHaveTextContent("");
    const square2 = board.getByTestId("square2");
    expect(square2).toHaveTextContent("");
    const square3 = board.getByTestId("square3");
    expect(square3).toHaveTextContent("");
    const square4 = board.getByTestId("square4");
    expect(square4).toHaveTextContent("");
    const square5 = board.getByTestId("square5");
    expect(square5).toHaveTextContent("");
    const square6 = board.getByTestId("square6");
    expect(square6).toHaveTextContent("");
    const square7 = board.getByTestId("square7");
    expect(square7).toHaveTextContent("");
    const square8 = board.getByTestId("square8");
    expect(square8).toHaveTextContent("");
  })
  it("Should render the next player as X initially",()=>{
    render(<App />);
    expect(screen.getByTestId("status")).toHaveTextContent("Next Player: X");
  })
});

describe("Check Functionalities",()=>{
  it("Should have X on first click",()=>{
    render(<App />);
    const square0 = screen.getByTestId("square0");
    fireEvent.click(square0);
    expect(square0).toHaveTextContent("X");
  });
  it("Should render next player as O after first click",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square0"));
    expect(screen.getByTestId("status")).toHaveTextContent("Next Player: O");
  })
  it("Should have O on second click",()=>{
    render(<App />);
    const square0 = screen.getByTestId("square0");
    fireEvent.click(square0);
    const square1 = screen.getByTestId("square1");
    fireEvent.click(square1);
    expect(square1).toHaveTextContent("O");
  });
  it("Should have X on odd number of clicks",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square0"));
    fireEvent.click(screen.getByTestId("square1"));
    fireEvent.click(screen.getByTestId("square2"));
    fireEvent.click(screen.getByTestId("square3"));
    const square4 = screen.getByTestId("square4");
    fireEvent.click(square4);
    expect(square4).toHaveTextContent("X");
  });
  it("should have O on even number of clicks",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square0"));
    fireEvent.click(screen.getByTestId("square1"));
    fireEvent.click(screen.getByTestId("square2"));
    fireEvent.click(screen.getByTestId("square3"));
    fireEvent.click(screen.getByTestId("square4"));
    const square5 = screen.getByTestId("square5");
    fireEvent.click(square5);
    expect(square5).toHaveTextContent("O");
  });
})

describe("Declaration of Winner",()=>{
  it("Should declare X as an winner if X completes a row first before O",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square0"));
    fireEvent.click(screen.getByTestId("square3"));
    fireEvent.click(screen.getByTestId("square1"));
    fireEvent.click(screen.getByTestId("square4"));
    fireEvent.click(screen.getByTestId("square2"));
    expect(screen.getByTestId("status")).toHaveTextContent("The Winner is: X");
  });
  it("Should declare O as an winner if O completes a row first before X",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square0"));
    fireEvent.click(screen.getByTestId("square3"));
    fireEvent.click(screen.getByTestId("square1"));
    fireEvent.click(screen.getByTestId("square4"));
    fireEvent.click(screen.getByTestId("square8"));
    fireEvent.click(screen.getByTestId("square5"));
    expect(screen.getByTestId("status")).toHaveTextContent("The Winner is: O");
  })
  it("Should declare X as an winner if X completes a column before O",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square0"));
    fireEvent.click(screen.getByTestId("square1"));
    fireEvent.click(screen.getByTestId("square3"));
    fireEvent.click(screen.getByTestId("square4"));
    fireEvent.click(screen.getByTestId("square6"));
    expect(screen.getByTestId("status")).toHaveTextContent("The Winner is: X");
  })
  it("Should declare O as an winner if O completes a column before X",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square0"));
    fireEvent.click(screen.getByTestId("square1"));
    fireEvent.click(screen.getByTestId("square3"));
    fireEvent.click(screen.getByTestId("square4"));
    fireEvent.click(screen.getByTestId("square5"));
    fireEvent.click(screen.getByTestId("square7"));
    expect(screen.getByTestId("status")).toHaveTextContent("The Winner is: O");
  });
  it("Should Declare X if it completes a diagonal before O",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square0"));
    fireEvent.click(screen.getByTestId("square1"));
    fireEvent.click(screen.getByTestId("square4"));
    fireEvent.click(screen.getByTestId("square2"));
    fireEvent.click(screen.getByTestId("square8"));
    expect(screen.getByTestId("status")).toHaveTextContent("The Winner is: X");
  })
  it("Should Declare O if it completes a diagonal before X",()=>{
    render(<App />);
    fireEvent.click(screen.getByTestId("square1"));
    fireEvent.click(screen.getByTestId("square0"));
    fireEvent.click(screen.getByTestId("square2"));
    fireEvent.click(screen.getByTestId("square4"));
    fireEvent.click(screen.getByTestId("square5"));
    fireEvent.click(screen.getByTestId("square8"));
    expect(screen.getByTestId("status")).toHaveTextContent("The Winner is: O");
  })
})
