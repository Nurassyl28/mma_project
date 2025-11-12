import { Ranking } from '../../domain/entities/ranking.entity';
import { RankingsService } from './rankings.service';
export declare class RankingsResolver {
    private readonly service;
    constructor(service: RankingsService);
    rankings(weightClass: string): Promise<Ranking[]>;
}
