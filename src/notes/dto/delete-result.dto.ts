import { ApiProperty } from '@nestjs/swagger';

export interface IDeleteResultDto {
  success: boolean;
}

export class DeleteResultDto implements IDeleteResultDto {
  @ApiProperty({ example: true })
  success: boolean;
}
