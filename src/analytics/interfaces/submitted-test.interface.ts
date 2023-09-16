export interface SubmittedTest {
  answers: Answer[];
  testID: string;
  submittedAt: string;
  user: {
    id: string;
    email: string;
  }
}

interface Answer {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
}