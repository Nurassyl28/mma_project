import { FightersService } from './fighters.service';
import { Fighter } from '../../domain/entities/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { Fight } from '../../domain/entities/fight.entity';
export declare class FightersResolver {
    private readonly service;
    constructor(service: FightersService);
    fighters(): Promise<Fighter[]>;
    fighter(slug: string): Promise<Fighter | null>;
    createFighter(input: CreateFighterInput): Promise<Fighter>;
    history(fighter: Fighter): Promise<Fight[]>;
}
