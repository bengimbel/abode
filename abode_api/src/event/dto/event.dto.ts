import { IsNotEmpty, IsString } from 'class-validator';

export class EventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  eventDate: string;
}
