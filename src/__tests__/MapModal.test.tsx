import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapModal from '@/components/MapModal';

describe('MapModal Component', () => {
  const mockOnClose = jest.fn();

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <MapModal isOpen={false} onClose={mockOnClose} stateName="Punjab" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders correctly when isOpen is true', () => {
    render(
      <MapModal isOpen={true} onClose={mockOnClose} stateName="Punjab" />
    );
    expect(screen.getByText(/Punjab Election Map/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Punjab Election Map/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <MapModal isOpen={true} onClose={mockOnClose} stateName="Punjab" />
    );
    const closeButton = screen.getByLabelText(/Close Modal/i);
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
