import { Fight } from '../../domain/entities/fight.entity';
import { FightsService } from './fights.service';
import { CreateFightInput } from './dto/create-fight.input';
import { ReportResultInput } from './dto/report-result.input';
export declare class FightsResolver {
    private readonly service;
    constructor(service: FightsService);
    createFight(input: CreateFightInput): Promise<Fight>;
    reportFightResult(input: ReportResultInput): Promise<Fight>;
    history(limit?: number): Promise<Fight[]>;
}
