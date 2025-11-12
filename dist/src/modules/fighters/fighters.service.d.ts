import { Repository } from 'typeorm';
import { Fighter } from '../../domain/entities/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { Fight } from '../../domain/entities/fight.entity';
export declare class FightersService {
    private repo;
    private fights;
    constructor(repo: Repository<Fighter>, fights: Repository<Fight>);
    create(dto: CreateFighterInput): Promise<Fighter>;
    findAll(): Promise<Fighter[]>;
    findBySlug(slug: string): Promise<Fighter | null>;
    historyForFighter(fighterId: string): Promise<Fight[]>;
}
