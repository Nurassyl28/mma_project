import { WeightClass } from '../../../domain/enums/weight-class.enum';
export declare class CreateFighterInput {
    slug: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    weightClass: WeightClass;
    country?: string;
}
