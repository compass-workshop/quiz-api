export interface Question {
  id: string;
  text: string;
  type: string;
  options: string[];
  maxScore: number;
  answer: string;
}
