import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { Note } from './entity/note.entity';
import { ICreateNoteDto, INoteDto, INoteListDto, IUpdateNoteDto } from './dto/note.dto';
import { NoteMapper } from './note.mapper';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly repository: Repository<Note>,
    private readonly mapper: NoteMapper
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

  async deleteNoteById(id: string): Promise<{ success: boolean }> {
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
