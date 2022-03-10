import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders header link', () => {
  render(<App />);
  const linkElement = screen.getByText(/dev98/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders img in header link', () => {
  render(<App />);
  const imgElement = screen.getAllByAltText(/dev98/i);
  expect(imgElement).toBeInTheDocument();
});

describe('Input value', () => {
  it('updates on change', () => {

    render(<App />);
    
    const searchInput = screen.getByPlaceholderText("Search...")

    fireEvent.change(searchInput, { target: { value: 'AJAX' } })

    //get all card liks
    const cardLinks = screen.getAllByAltText('Go to blog post')

    expect(cardLinks).toHaveLength(1);
  })
})

