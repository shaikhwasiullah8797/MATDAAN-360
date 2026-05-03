import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { LanguageProvider } from '@/context/LanguageContext';

// Mock LanguageProvider to provide necessary context
const renderWithLanguage = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('Navbar Component', () => {
  it('renders the application name', () => {
    renderWithLanguage(<Navbar />);
    const appName = screen.getByText(/Matdaan 360/i);
    expect(appName).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithLanguage(<Navbar />);
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn/i)).toBeInTheDocument();
  });

  it('has correct ARIA labels', () => {
    renderWithLanguage(<Navbar />);
    const homeLink = screen.getByLabelText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });
});
