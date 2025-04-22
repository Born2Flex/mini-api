import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICreateNoteDto, INoteDto, INoteListDto, IUpdateNoteDto } from './dto/note.dto';
import { CreateNoteDto, NoteDto, NoteListDto, UpdateNoteDto } from './dto/swagger.dto';
import { NotesService } from './notes.service';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({ status: 200, description: 'List of notes', type: NoteListDto })
  @ApiResponse({ status: 200, description: 'List of notes' })
  async findAllNotes(): Promise<INoteListDto> {
    return await this.service.findAllNotes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiParam({ name: 'id', description: 'Note ID' })
  @ApiResponse({ status: 200, description: 'Found note', type: NoteDto })
  @ApiResponse({ status: 200, description: 'Found note' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async findNoteById(@Param('id') id: string): Promise<INoteDto> {
    return this.service.findNoteById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new note' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, description: 'The note has been successfully created.', type: NoteDto })
  async createNote(@Body() dto: ICreateNoteDto): Promise<INoteDto> {
    return this.service.createNote(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiParam({ name: 'id', description: 'Note ID' })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200, description: 'Updated note', type: NoteDto })
  @ApiResponse({ status: 200, description: 'Updated note' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async updateNote(@Param('id') id: string, @Body() dto: IUpdateNoteDto): Promise<INoteDto> {
    return this.service.updateNote(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiParam({ name: 'id', description: 'Note ID' })
  @ApiResponse({ status: 200, description: 'Deletion result', schema: { example: { success: true } } })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async deleteNoteById(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.deleteNoteById(id);
  }
}
