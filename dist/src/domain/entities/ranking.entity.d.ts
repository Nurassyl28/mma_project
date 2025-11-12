import { Fighter } from './fighter.entity';
export declare class Ranking {
    id: string;
    fighter: Fighter;
    weightClass: string;
    points: number;
    wins: number;
    losses: number;
    draws: number;
    rank: number;
    lastActivity?: Date;
}
