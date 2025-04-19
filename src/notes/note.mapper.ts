import { Note } from './entity/note.entity';
import {ICreateNoteDto, INoteDto, INoteListDto} from './dto/note.dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class NoteMapper {
  toDto(note: Note): INoteDto {
    const { id, title, content } = note;
    return { id, title, content };
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
