import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Repository } from 'typeorm';
import { Fight } from '../../domain/entities/fight.entity';
import { Ranking } from '../../domain/entities/ranking.entity';
import { Fighter } from '../../domain/entities/fighter.entity';
export declare class RankingProcessor extends WorkerHost {
    private fights;
    private ranks;
    private fighters;
    constructor(fights: Repository<Fight>, ranks: Repository<Ranking>, fighters: Repository<Fighter>);
    process(job: Job<{
        weightClass: string;
        lastActivity: Date;
    }>): Promise<void>;
}
