import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '@/components/Quiz';
import { LanguageProvider } from '@/context/LanguageContext';

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

const sampleQuestions = [
  {
    question: "What is the voting age in India?",
    options: ["16", "18", "21", "25"],
    correctAnswer: 1
  }
];

describe('Quiz Component', () => {
  it('renders the first question', () => {
    renderWithLanguage(<Quiz questions={sampleQuestions} />);
    expect(screen.getByText(/What is the voting age in India?/i)).toBeInTheDocument();
  });

  it('updates score and shows result after last question', async () => {
    jest.useFakeTimers();
    renderWithLanguage(<Quiz questions={sampleQuestions} />);
    const correctOption = screen.getByText(/18/i);
    fireEvent.click(correctOption);
    
    // Fast-forward 1 second for the timeout
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(await screen.findByText(/Quiz Completed!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Score:/i)).toBeInTheDocument();
    
    // Test reset
    const restartButton = screen.getByText(/Restart Quiz/i);
    fireEvent.click(restartButton);
    expect(await screen.findByText(/What is the voting age in India?/i)).toBeInTheDocument();
    jest.useRealTimers();
  });
});
