import { Fight } from './fight.entity';
export declare class Event {
    id: string;
    name: string;
    location: string;
    date: Date;
    fights: Fight[];
}
