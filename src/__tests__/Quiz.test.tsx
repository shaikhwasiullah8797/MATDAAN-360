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

  it('updates score when correct answer is clicked', () => {
    renderWithLanguage(<Quiz questions={sampleQuestions} />);
    const correctOption = screen.getByText(/18/i);
    fireEvent.click(correctOption);
    expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
  });
});
