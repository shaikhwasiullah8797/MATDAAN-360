import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Flashcard from '@/components/Flashcard';
import { LanguageProvider } from '@/context/LanguageContext';

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('Flashcard Component', () => {
  it('renders front content by default', () => {
    renderWithLanguage(<Flashcard frontContent="Front" backContent="Back" />);
    expect(screen.getByText(/Front/i)).toBeInTheDocument();
  });

  it('flips to back content when clicked', () => {
    renderWithLanguage(<Flashcard frontContent="Front" backContent="Back" />);
    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  it('flips on keyboard Enter', () => {
    renderWithLanguage(<Flashcard frontContent="Front" backContent="Back" />);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });
});
