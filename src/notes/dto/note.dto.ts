import { ApiProperty } from '@nestjs/swagger';

export interface INoteDto {
  id: string;
  title: string;
  content?: string;
}

export class NoteDto implements INoteDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'Some title' })
  title: string;

  @ApiProperty({ example: 'Go for a walk', required: false })
  content?: string;
}
