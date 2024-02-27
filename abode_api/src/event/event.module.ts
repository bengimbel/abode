import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [EventController],
  providers: [EventService],
})
// eslint-disable-next-line prettier/prettier
export class EventModule { }
