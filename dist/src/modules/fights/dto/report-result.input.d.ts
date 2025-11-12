import { Method } from '../../../domain/enums/method.enum';
export declare class ReportResultInput {
    fightId: string;
    winnerId: string;
    method: Method;
    round: number;
    time: string;
}
