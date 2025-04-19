import { ApiProperty } from '@nestjs/swagger';

export class NoteDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'Some title' })
  title: string;

  @ApiProperty({ example: 'Go for a walk', required: false })
  content?: string;
}

export class NoteListDto {
  @ApiProperty({ type: [NoteDto] })
  items: NoteDto[];
}

export class CreateNoteDto {
  @ApiProperty({ example: 'Meeting notes' })
  title: string;

  @ApiProperty({ example: 'Discuss project timeline', required: false })
  content?: string;
}

export class UpdateNoteDto {
  @ApiProperty({ example: 'Updated title', required: false })
  title?: string;

  @ApiProperty({ example: 'Updated content', required: false })
  content?: string;
}

export class DeleteResultDto {
  @ApiProperty({ example: true })
  success: boolean;
}
