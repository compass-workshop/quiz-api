import { ApiProperty } from '@nestjs/swagger';

export class Question {
  @ApiProperty({
    type: String,
    description: 'Question id',
    example: 'abcd-1234-efgh-5678',
  })
  id: string;
  @ApiProperty({
    type: String,
    description: 'Question text',
    example: 'What is the capital of India?',
  })
  text: string;
  @ApiProperty({
    type: String,
    description: 'Question type',
    example: 'MCQ',
  })
  type: string;
  @ApiProperty({
    type: [String],
    description: 'Question options',
    example: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
  })
  options: string[];
  @ApiProperty({
    type: Number,
    description: 'Question max score',
    example: 1,
  })
  maxScore: number;
  @ApiProperty({
    type: String,
    description: 'Question answer',
    example: 'Delhi',
  })
  answer: string;
}
