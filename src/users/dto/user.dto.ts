import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'FirstName of the user',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'LastName of the user',
    example: 'Doe',
  })
  lastName: string;
}
