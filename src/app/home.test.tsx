
import { render, screen } from '@testing-library/react';
import Home from './page';

test('renders the main heading', () => {
  render(<Home />);
  const heading = screen.getByRole('heading', { name: /welcome to our restaurant/i });
  expect(heading).toBeInTheDocument();
});
