import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { EventService } from './event.service';
import CustomRequest from 'src/interfaces/request';
import { User } from '../types/user';
import { EventDto } from './dto';
import { Event } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('events')
export class EventController {
  // eslint-disable-next-line prettier/prettier
  constructor(private eventService: EventService) { }

  @Get()
  findAll(@Request() req: CustomRequest): Promise<Event[]> {
    const user = req.user as User;
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    return this.eventService.findAll(user);
  }

  @Get('upcoming')
  findAllUpcoming(@Request() req: CustomRequest): Promise<Event[]> {
    const user = req.user as User;
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    return this.eventService.findAllUpcoming(user);
  }

  @Get(':id')
  findOne(
    @Request() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<Event> {
    const user = req.user as User;
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const eventId: number = parseInt(id);

    return this.eventService.findOne(user, eventId);
  }

  @Put(':id')
  update(
    @Request() req: CustomRequest,
    @Param('id') id: string,
    @Body() updatedEvent: EventDto,
  ): Promise<Event> {
    const user = req.user as User;
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    return this.eventService.update(+id, user, updatedEvent);
  }

  @Post('')
  create(
    @Request() req: CustomRequest,
    @Body() event: EventDto,
  ): Promise<Event> {
    const user = req.user as User;
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    return this.eventService.create(user, event);
  }

  @Delete(':id')
  remove(
    @Request() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<Event> {
    const user = req.user as User;
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const eventId: number = parseInt(id);
    return this.eventService.remove(user, eventId);
  }
}
