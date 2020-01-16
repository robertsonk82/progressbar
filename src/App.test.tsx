import React from 'react';
import {render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";

import App from './App';
import ProgressController from "./components/ProgressController"

afterEach(cleanup);
let apiData = {"buttons":[12,15,-50,-48],"bars":[74,26,20],"limit":130}
it("matches snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

it("Render All Progress Elements", () => {
  const {container} = render(<ProgressController data={apiData} />);
  const buttons = container.querySelectorAll('button');
  const progressBars = container.querySelectorAll('.progress-text');
  const select = container.querySelector('select');
  const options = select!.querySelectorAll('option');
  expect(buttons.length).toBe(4);
  expect(progressBars.length).toBe(3);
  expect(options.length).toBe(3);
});

it("Fire button click event", () => {
  const { getByText} = render(<ProgressController data={apiData} />);
  const button = getByText("12");
  const progressBar1 = getByText("57%");

  fireEvent.click(button);
  expect(progressBar1).toHaveTextContent("66%")
});

it("Check value not be less than 0 ", () => {
  const { getByText} = render(<ProgressController data={apiData} />);
  const button = getByText("-50");
  const progressBar1 = getByText("20%");
  fireEvent.click(button);
  expect(progressBar1).toHaveTextContent("0%")
});

it("Select set 2nd progress bor and apply button click event", () => {
  const { container, getByText} = render(<ProgressController data={apiData} />);
  const button = getByText("12");
  const progressBar2 = getByText("20%");

  const select=container.querySelector("select");
  if(select){
    fireEvent.change(select,{target:{value:"1"}});
  }

  fireEvent.click(button);
  expect(progressBar2).toHaveTextContent("29%")
});

it("Check css color for the bar crossed above 100% ", () => {
  apiData = {"buttons":[70,15,-50,-48],"bars":[74,26,20],"limit":130}
  const {container, getByText} = render(<ProgressController data={apiData} />);
  const button = getByText("70");
  fireEvent.click(button);
  const progressBar1 = container.querySelectorAll('.crossedLimit');
  expect(progressBar1.length).toBe(1);
});
