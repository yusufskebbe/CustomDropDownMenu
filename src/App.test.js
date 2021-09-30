import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';


describe("<App /> ", () => {

  it("should contain and test h3 element value ", () => {

    render(<App />)
    const h3Elemenet = screen.getByText("Custom Dropdown");
    expect(h3Elemenet.textContent).toBe("Custom Dropdown");

  })
  //screen.getByText("Custom Dropdown");
})