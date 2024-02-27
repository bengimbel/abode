import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../types/user';
import { EventDto } from './dto';
import { Event } from '@prisma/client';

@Injectable()
export class EventService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) { }

  async findAll(user: User): Promise<Event[]> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          userId: {
            equals: user.sub,
          },
        },
      });

      return events;
    } catch (e) {
      throw new Error(e);
    }
  }

  async setNotifiedOnEvents(
    user: User,
    yesterday: Date,
    tomorrow: Date,
  ): Promise<void> {
    await this.prisma.event.updateMany({
      where: {
        userId: {
          equals: user.sub,
        },
        eventDate: {
          lte: tomorrow,
          gte: yesterday,
        },
      },
      data: { notified: true },
    });
  }

  async findAllUpcoming(user: User): Promise<Event[]> {
    const yesterday = new Date();
    const tomorrow = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
      const events = await this.prisma.event.findMany({
        where: {
          userId: {
            equals: user.sub,
          },
          notified: {
            equals: false,
          },
          eventDate: {
            lte: tomorrow,
            gte: yesterday,
          },
        },
      });
      const eventList: Event[] = [...events];
      await this.setNotifiedOnEvents(user, yesterday, tomorrow);
      return eventList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(user: User, id: number): Promise<Event> {
    try {
      const event = await this.prisma.event.findFirst({
        where: {
          userId: {
            equals: user.sub,
          },
          id: {
            equals: id,
          },
        },
      });
      return event;
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(user: User, eventRequest: EventDto): Promise<Event> {
    try {
      const event = await this.prisma.event.create({
        data: {
          title: eventRequest.title,
          description: eventRequest.description,
          eventDate: new Date(eventRequest.eventDate),
          userId: user.sub,
        },
      });

      return event;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: number, user: User, eventRequest: EventDto): Promise<Event> {
    try {
      const event = await this.prisma.event.update({
        where: {
          id: id,
          userId: {
            equals: user.sub,
          },
        },
        data: {
          title: eventRequest.title,
          description: eventRequest.description,
          eventDate: new Date(eventRequest.eventDate),
          userId: user.sub,
        },
      });

      return event;
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(user: User, id: number): Promise<Event> {
    try {
      const event = await this.prisma.event.delete({
        where: {
          userId: {
            equals: user.sub,
          },
          id: id,
        },
      });
      return event;
    } catch (e) {
      throw new Error(e);
    }
  }
}
