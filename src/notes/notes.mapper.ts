import { Note } from './entity/note.entity';
import { INoteDto } from './dto/note.dto';
import { INoteListDto } from './dto/note-list.dto';
import { ICreateNoteDto } from './dto/create-note.dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class NotesMapper {
  toDto(note: Note): INoteDto {
    return {
      id: note.id,
      title: note.title,
      content: note.content
    };
  }

  toListDto(notes: Note[]): INoteListDto {
    return { items: notes.map(note => this.toDto(note)) };
  }

  toEntity(dto: ICreateNoteDto): Note {
    const note = new Note();
    note.title = dto.title;
    note.content = dto.content ?? '';
    return note;
  }
}
