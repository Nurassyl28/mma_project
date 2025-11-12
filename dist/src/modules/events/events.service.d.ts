import { Repository } from 'typeorm';
import { Event } from '../../domain/entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
export declare class EventsService {
    private repo;
    constructor(repo: Repository<Event>);
    create(dto: CreateEventInput): Promise<Event>;
    findAll(): Promise<Event[]>;
    findUpcoming(limit?: number): Promise<Event[]>;
}
