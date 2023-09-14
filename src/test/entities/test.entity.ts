import { Question } from './question.entity';

export interface Test {
  id: string;
  name: string;
  questions: Question[];
}
