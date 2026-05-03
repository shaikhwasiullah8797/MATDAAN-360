import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';

const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="app-name">{t.appName}</span>
      <button onClick={() => setLanguage('hi')}>Switch to Hindi</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default language as English', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    // Wait for mounted state
    const lang = await screen.findByTestId('lang');
    expect(lang).toHaveTextContent('en');
  });

  it('switches language correctly', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    const button = await screen.findByText(/Switch to Hindi/i);
    fireEvent.click(button);
    
    const lang = await screen.findByTestId('lang');
    expect(lang).toHaveTextContent('hi');
    expect(localStorage.getItem('language')).toBe('hi');
  });

  it('loads saved language from localStorage', async () => {
    localStorage.setItem('language', 'pa');
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    const lang = await screen.findByTestId('lang');
    expect(lang).toHaveTextContent('pa');
  });

  it('throws error when used outside of Provider', () => {
    // Suppress console.error for this test as we expect an error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');
    
    consoleSpy.mockRestore();
  });
});
