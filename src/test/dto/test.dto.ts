import { ApiProperty } from '@nestjs/swagger';
import { Question } from './question.dto';

export class Test {
  @ApiProperty({
    description: 'Test id',
    example: 'abcd-1234-efgh-5678',
  })
  id: string;

  @ApiProperty({
    description: 'Test name',
    example: 'Test 1',
  })
  name: string;
  
  @ApiProperty({
    description: 'Test Questions',
    type: [Question],
  })
  questions: Question[];
}
