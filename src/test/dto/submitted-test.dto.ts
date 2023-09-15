import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { SelectedAnswer } from '../enum/selected-answer.enum';

class SubmittedAnswer {
  @IsString()
  questionId: string;

  @IsEnum(SelectedAnswer)
  selectedAnswer: SelectedAnswer;
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
