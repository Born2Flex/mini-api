import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { Note } from './entity/note.entity';
import { INoteDto } from './dto/note.dto';
import { INoteListDto } from './dto/note-list.dto';
import { ICreateNoteDto } from './dto/create-note.dto';
import { IUpdateNoteDto } from './dto/update-note.dto';
import { IDeleteResultDto } from './dto/delete-result.dto';
import { NotesMapper } from './notes.mapper';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly repository: Repository<Note>,
    private readonly mapper: NotesMapper
  ) {}

  async findAllNotes(): Promise<INoteListDto> {
    const notes = await this.repository.find();
    return this.mapper.toListDto(notes);
  }

  async findNoteById(id: string): Promise<INoteDto> {
    const note = await this.findByIdOrElseThrow(id);
    return this.mapper.toDto(note);
  }

  async createNote(dto: ICreateNoteDto): Promise<INoteDto> {
    const noteEntity = this.mapper.toEntity(dto);
    const saved = await this.repository.save(noteEntity);
    return this.mapper.toDto(saved);
  }

  async updateNote(id: string, dto: IUpdateNoteDto): Promise<INoteDto> {
    await this.findByIdOrElseThrow(id);
    await this.repository.update(id, dto);
    return this.findNoteById(id);
  }

  async deleteNoteById(id: string): Promise<IDeleteResultDto> {
    await this.findByIdOrElseThrow(id);
    await this.repository.delete(id);
    return { success: true };
  }


  async findByIdOrElseThrow(id: string): Promise<Note> {
    let errorMessage = `Note with id ${id} not found.`;
    if (!validate(id)) {
      throw new NotFoundException(errorMessage);
    }
    const note = await this.repository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(errorMessage);
    }
    return note;
  }
}
