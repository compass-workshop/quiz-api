export class Question {
  id: string;
  type: string;
  maxScore: number;
  question: string;
  options: [
    {
      text: string;
    },
    {
      text: string;
    },
    {
      text: string;
    },
    {
      text: string;
    },
  ];
}
