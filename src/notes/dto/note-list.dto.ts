import { ApiProperty } from '@nestjs/swagger';
import { INoteDto, NoteDto } from './note.dto';

export interface INoteListDto {
  items: INoteDto[];
}

export class NoteListDto implements INoteListDto {
  @ApiProperty({ type: [NoteDto] })
  items: NoteDto[];
}
