export interface EvaluatedTestMsg {
  fact_id: string;
  fact_name: string;
  timestamp: number;
  test_id: string;
  raw_score: number;
  max_score: number;
  status: string;
  evaluated_answers: EvaluatedAnswer[];
  user: {
    id: string;
    email: string;
  };
}

export interface EvaluatedAnswer {
  question_id: string;
  question_text: string;
  correct_answer: string;
  submitted_answer: string;
  raw_score: number;
  max_score: number;
  status: string;
}

export interface EvaluatedTestStatus {
  raw_score: number;
  max_score: number;
  status: string;
}
