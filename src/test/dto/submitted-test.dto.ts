import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class SubmittedAnswer {
  @IsString()
  questionId: string;

  @IsString()
  questionText: string;

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

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  submittedAmswers: SubmittedAnswer[];
}
