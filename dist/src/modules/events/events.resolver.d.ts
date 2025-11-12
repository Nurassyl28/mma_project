import { Event } from '../../domain/entities/event.entity';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
export declare class EventsResolver {
    private readonly service;
    constructor(service: EventsService);
    events(): Promise<Event[]>;
    upcomingEvents(limit?: number): Promise<Event[]>;
    createEvent(input: CreateEventInput): Promise<Event>;
}
