import React from 'react';
import { render, fireEvent } from "@testing-library/react-native";

import CreateAccount from '../CreateAccount';

beforeEach(() => {
    fetch.resetMocks();
})

test('it renders all inputs as expected', () => {
    const { toJSON } = render(<CreateAccount />);
    expect(toJSON()).toMatchSnapshot();
})

test('displays error message if all fields are not completed', () => {
    const { getByTestId, getByText } = render(<CreateAccount />);
    expect(getByTestId("CreateAccount.errorMessage").props.children).toBeNull();

    fireEvent.press(getByText('Submit'));

    expect(getByTestId("CreateAccount.errorMessage").props.text).not.toBeNull();

    fireEvent.changeText(getByTestId("CreateAccount.email"), 'test@example.com');

    expect(getByTestId("CreateAccount.errorMessage").props.text).not.toBeNull();
});

test("doesn't display error message if all fields are complete", async () => {
  fetch.mockResponseOnce(JSON.stringify({}));

  const { getByTestId, getByText } = render(<CreateAccount />);

  expect(getByTestId("CreateAccount.errorMessage").props.children).toBeNull();

  fireEvent.press(getByText("Submit"));

  expect(getByTestId("CreateAccount.errorMessage").props.text).not.toBeNull();

  fireEvent(
    getByTestId("CreateAccount.email"),
    "onChangeText",
    "test@example.com"
  );
  fireEvent(
    getByTestId("CreateAccount.firstName"),
    "onChangeText",
    "Rosen"
  );
  fireEvent(
    getByTestId("CreateAccount.lastName"),
    "onChangeText",
    "Toshev"
  );
  fireEvent(
    getByTestId("CreateAccount.password"),
    "onChangeText",
    "password"
  );
  fireEvent(
    getByTestId("CreateAccount.confirmPassword"),
    "onChangeText",
    "password"
  );

  fireEvent.press(getByText("Submit"));
  expect(getByTestId("CreateAccount.errorMessage").props.children).toBeNull();
  
//   await expect(fetch.mock.calls.length).toEqual(1);
});
