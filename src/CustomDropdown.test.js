import { render, screen, fireEvent, getByTestId, getByTitle } from '@testing-library/react';

import CustomDropdown from './CustomDropdown';

import "@testing-library/jest-dom"
import { testA11y } from './utils/test/testUtils';


describe("<CustomDropdown />", () => {

  const values = [];

  const options = [{
    body: ""
    , id: 2,
    title: "title 1",
    userId: 1
  }, {
    body: ""
    , id: 3,
    title: "title 2",
    userId: 2
  }]
  const defaultCustomDropdownProps = { title: "Data", onChange: jest.fn(), values, options, role: "combobox" }

  it("testing the container", () => {
    render(<CustomDropdown {...defaultCustomDropdownProps} />)
  })


  it("testing the title", () => {


    render(<CustomDropdown {...defaultCustomDropdownProps} />)

    const containerElement = screen.getByRole("combobox");
    const titleElement = screen.getByText("Data");
    expect(containerElement).toContainElement(titleElement);

  })

  it("testing the button", () => {
    render(<CustomDropdown {...defaultCustomDropdownProps} />)

    const containerElement = screen.getByRole("combobox");
    const buttonElement = screen.queryByText("Submit");

    expect(containerElement).not.toContainElement(buttonElement);

  });

  it("testing the input", () => {
    render(<CustomDropdown {...defaultCustomDropdownProps} />)

    const inputElement = screen.getByPlaceholderText("Type");

    fireEvent.change(inputElement, { target: { value: "test" } })

    expect(inputElement).toHaveValue("test")

  })
  it("testing dropdown item have been called ", () => {
    render(<CustomDropdown {...defaultCustomDropdownProps} />)

    const dropdownItem = screen.getByText(defaultCustomDropdownProps.options[0].title);
    fireEvent.click(dropdownItem)
    expect(defaultCustomDropdownProps.onChange).toHaveBeenCalledTimes(1);

  })

  //Snapshot test    
  // it("testing snapshot", () => {
  //   const { asFragment } = render(<CustomDropdown {...defaultCustomDropdownProps} />)
  //   expect(asFragment()).toMatchSnapshot();
  // })



  // it("should pass  a11y test", async () => {
  //   const { container } = render(<CustomDropdown {...defaultCustomDropdownProps} />)
  //   await testA11y(container)

  // })


  it("testing the arrow span is in the container element", () => {
    render(<CustomDropdown {...defaultCustomDropdownProps} />)
    const containerElement = screen.getByRole("combobox");
    const arrowSpan = screen.getByTitle("arrow");
    expect(containerElement).toContainElement(arrowSpan);

  })

})

