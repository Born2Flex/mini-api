import { ApiProperty } from '@nestjs/swagger';

export interface ICreateNoteDto {
  title: string;
  content?: string;
}

export class CreateNoteDto implements ICreateNoteDto {
  @ApiProperty({ example: 'Meeting notes' })
  title: string;

  @ApiProperty({ example: 'Discuss project timeline', required: false })
  content?: string;
}
