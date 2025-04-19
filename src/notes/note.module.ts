import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Note } from './entity/note.entity';
import { NoteMapper } from './note.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [
    NoteMapper,
    NoteService
  ],
})
export class NoteModule {}
