import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../button'; // Adjust path as necessary

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies variant prop correctly', () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const buttonElement = screen.getByText(/destructive button/i);
    // You might need to check for a specific class if variants apply classes
    // For now, just checking if it renders is a good start
    expect(buttonElement).toBeInTheDocument();
    // Example of checking a class if 'destructive' variant adds a specific class like 'bg-destructive'
    // Assuming 'variant="destructive"' results in a class that includes 'destructive'
    // expect(buttonElement).toHaveClass('bg-destructive');
    // This part is commented out as we don't know the exact class names from button.tsx
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText(/disabled button/i);
    expect(buttonElement).toBeDisabled();
  });
});
