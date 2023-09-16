export interface EvaluatedTestMsg {
  evaluation: Evaluation;
  testId: string;
  submittedAt: string;
  user: {
    id: string;
    email: string;
  };
}

export interface Evaluation {
  maxScore: number;
  rawScore: number;
  status: string;
  evaluatedAnswers: EvaluatedAnswer[];
}

export interface EvaluatedAnswer {
  questionId: string;
  questionScore: number;
  selectedAnswer: string;
}
