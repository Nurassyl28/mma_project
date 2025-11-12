import { Repository } from 'typeorm';
import { Ranking } from '../../domain/entities/ranking.entity';
export declare class RankingsService {
    private repo;
    constructor(repo: Repository<Ranking>);
    list(weightClass: string): Promise<Ranking[]>;
}
