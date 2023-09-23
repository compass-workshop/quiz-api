import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class SubmittedAnswer {
  @ApiProperty()
  @IsString()
  questionId: string;

  @ApiProperty()
  @IsString()
  questionText: string;

  @IsString()
  selectedAnswer: string;
}

export class SubmittedTestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  testId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  submittedAt: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  submittedBy: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    isArray: true,
    type: SubmittedAnswer,
  })
  @IsArray()
  @IsNotEmpty()
  submittedAmswers: SubmittedAnswer[];
}
