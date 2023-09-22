export interface SubmittedTest {
  fact_id: string;
  fact_name: string;
  timestamp: number;
  test_id: string;
  submitted_answers: SubmittedAnswer[];
  user: {
    id: string;
    email: string;
  };
}

export interface SubmittedAnswer {
  question_id: string;
  question_text: string;
  answer: string;
}
