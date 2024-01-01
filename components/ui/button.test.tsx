import { render, screen, fireEvent } from '@testing-library/react';
import { Button, buttonVariants } from './button';

describe('Button Component', () => {
  it('renders without crashing', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies default styles if no variant or size is provided', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(
      buttonVariants({ variant: 'default', size: 'default' })
    );
  });

  it('applies the correct variant and size styles', () => {
    render(<Button variant="destructive" size="lg" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(
      buttonVariants({ variant: 'destructive', size: 'lg' })
    );
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
