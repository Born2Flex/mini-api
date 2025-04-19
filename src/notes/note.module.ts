import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notesController';
import { NotesService } from './notes.service';
import { Note } from './entity/note.entity';
import { NotesMapper } from './notes-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [
    NotesMapper,
    NotesService
  ],
})
export class NoteModule {}
