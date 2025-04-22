import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note } from './entity/note.entity';
import { NotesMapper } from './notes.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [
    NotesMapper,
    NotesService
  ],
})
export class NotesModule {}
