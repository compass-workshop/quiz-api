export interface SubmittedTest {
  answers: Answer[];
  testId: string;
  submittedAt: number;
  user: {
    id: string;
    email: string;
  }
}

export interface Answer {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
}