import { WeightClass } from '../enums/weight-class.enum';
import { Fight } from './fight.entity';
export declare class Fighter {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    weightClass: WeightClass;
    country?: string;
    redFights: Fight[];
    blueFights: Fight[];
}
