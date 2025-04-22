import { ApiProperty } from '@nestjs/swagger';

export interface IUpdateNoteDto {
  title?: string;
  content?: string;
}

export class UpdateNoteDto implements IUpdateNoteDto {
  @ApiProperty({ example: 'Updated title', required: false })
  title?: string;

  @ApiProperty({ example: 'Updated content', required: false })
  content?: string;
}
