import React from 'react';
import { render } from '@testing-library/react';
import { Homepage } from '.';

test('renders front page', () => {
  const { getByText, getByTestId } = render(<Homepage />);
  const titleElement = getByText("Danny Zolp");

  const socialElements = [
    getByTestId("Github"),
    getByTestId("Twitter"),
    getByTestId("Linkedin"),
    getByTestId("Discord"),
    getByTestId("Email")
  ]

  expect(titleElement).toBeInTheDocument();

  socialElements.forEach(element => {
    expect(element).toBeInTheDocument();
  })
});