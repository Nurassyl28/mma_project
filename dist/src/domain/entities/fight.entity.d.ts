import { Event } from './event.entity';
import { Fighter } from './fighter.entity';
import { Method } from '../enums/method.enum';
export declare class Fight {
    id: string;
    event: Event;
    redFighter: Fighter;
    blueFighter: Fighter;
    winnerId?: string;
    method?: Method;
    round?: number;
    time?: string;
    isFinalized: boolean;
    weightClass: string;
}
