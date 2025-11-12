import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../domain/entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private repo: Repository<Event>) {}
  create(dto: CreateEventInput) { return this.repo.save(this.repo.create(dto)); }
  findAll() { return this.repo.find({ relations: ['fights'] }); }
  async findUpcoming(limit = 5) {
    const take = Math.min(Math.max(limit ?? 5, 1), 50);
    const events = await this.repo.find({ relations: ['fights'] });
    return events
      .filter((event) => event.date >= new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, take);
  }
}
