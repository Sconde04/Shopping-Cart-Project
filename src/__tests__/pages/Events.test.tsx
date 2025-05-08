import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Events from '../../pages/Events';
import App from '../../App';
import { fetchEvents } from '../../services/api';

// Basic fetchEvents mock
vi.mock('../../services/api', () => ({
  fetchEvents: vi.fn()
}));

// Simple EventCard mock
vi.mock('../../components/EventCard', () => ({
  default: ({ title, onAddToCart }: { title: string; onAddToCart?: () => void }) => (
    <div data-testid="event-card">
      <h3>{title}</h3>
      <button onClick={onAddToCart} data-testid="add-to-cart">Add to Cart</button>
    </div>
  )
}));

describe('This test should run the events page', () => {
  const mockEvents = [
    {
      id: '1',
      title: 'Test Concert 1',
      description: 'Test Description 1',
      image: 'test-image-1.jpg',
      place: 'Test Place 1',
      date: '2024-03-20',
      time: '20:00',
      price: 100,
      discount: 10
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (fetchEvents as any).mockResolvedValue(mockEvents);
  });

  test('shows correct title with number of products', async () => {
    render(<Events />);
    expect(await screen.findByText('1 Products')).toBeInTheDocument();
  });

  test('shows header message', () => {
    render(<App />);
    expect(
      screen.getByText(
        'Free shipping on all orders over $200! For a limited time only.'
      )
    ).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    (fetchEvents as any).mockRejectedValue(new Error('Failed to fetch'));
    render(<Events />);
    expect(await screen.findByText('Failed to load events. Please try again later.')).toBeInTheDocument();
  });

  test('shows events correctly', async () => {
    render(<Events />);
    expect(await screen.findByText('Test Concert 1')).toBeInTheDocument();
  });
}); 