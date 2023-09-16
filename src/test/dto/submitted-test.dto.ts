import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

class SubmittedAnswer {
  @IsString()
  questionId: string;

  @IsString()
  selectedAnswer: string;
}

export class SubmittedTestDto {
  @IsString()
  @IsNotEmpty()
  testId: string;

  @IsNumber()
  @IsNotEmpty()
  submittedAt: number;

  @IsString()
  @IsNotEmpty()
  submittedBy: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  submittedAmswers: SubmittedAnswer[];
}
