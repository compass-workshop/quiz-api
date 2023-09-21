import { ApiProperty } from "@nestjs/swagger";

export class Analytics {
  @ApiProperty({
    description: 'User id',
    example: 'abcd-1234-efgh-5678',
  })
  USERID: string;

  @ApiProperty({
    description: 'Total Test',
    example: '8',
  })
  TOTAL_TEST: number;

  @ApiProperty({
    description: 'Max score',
    example: '5',
  })
  MAX_SCORE: number;

  @ApiProperty({
    description: 'Average Score',
    example: '4',
  })
  AVG_SCORE: number;

  @ApiProperty({
    description: 'Passed Test',
    example: '5',
  })
  PASSED_TEST: number;
}