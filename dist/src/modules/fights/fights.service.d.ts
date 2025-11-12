import { Fight } from '../../domain/entities/fight.entity';
import { Event } from '../../domain/entities/event.entity';
import { Fighter } from '../../domain/entities/fighter.entity';
import { Repository } from 'typeorm';
import { CreateFightInput } from './dto/create-fight.input';
import { ReportResultInput } from './dto/report-result.input';
import { RankingQueueService } from '../../infra/ranking-queue/ranking.service';
export declare class FightsService {
    private fights;
    private events;
    private fighters;
    private rankingQueue;
    constructor(fights: Repository<Fight>, events: Repository<Event>, fighters: Repository<Fighter>, rankingQueue: RankingQueueService);
    create(dto: CreateFightInput): Promise<Fight>;
    reportResult(input: ReportResultInput): Promise<Fight>;
    history(limit?: number): Promise<Fight[]>;
}
