import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StateWiseUpdates from '@/components/StateWiseUpdates';
import { LanguageProvider } from '@/context/LanguageContext';

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('StateWiseUpdates Component', () => {
  it('renders the search input', async () => {
    renderWithLanguage(<StateWiseUpdates />);
    const searchInput = await screen.findByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('filters states based on search term', async () => {
    renderWithLanguage(<StateWiseUpdates />);
    const searchInput = await screen.findByRole('textbox');
    
    // Search for Punjab
    fireEvent.change(searchInput, { target: { value: 'Punjab' } });
    
    expect(await screen.findByText(/Punjab/i)).toBeInTheDocument();
    // Assam should be filtered out
    await waitFor(() => {
      expect(screen.queryByText(/Assam/i)).not.toBeInTheDocument();
    });
  });

  it('shows no results message when no match is found', async () => {
    renderWithLanguage(<StateWiseUpdates />);
    const searchInput = await screen.findByRole('textbox');
    
    fireEvent.change(searchInput, { target: { value: 'NonExistentState' } });
    
    expect(screen.getByText(/No states found matching/i)).toBeInTheDocument();
  });

  it('opens map modal when a state card is clicked', async () => {
    renderWithLanguage(<StateWiseUpdates />);
    const assamCard = await screen.findByText(/Assam/i);
    fireEvent.click(assamCard);
    
    expect(screen.getByText(/Assam Election Map/i)).toBeInTheDocument();
  });
});
