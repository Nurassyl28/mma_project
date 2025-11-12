import { Queue } from 'bullmq';
export declare class RankingQueueService {
    private queue?;
    private readonly logger;
    constructor(queue?: Queue | undefined);
    enqueueRecompute(weightClass: string, lastActivity: Date): Promise<import("bullmq").Job<any, any, string>> | undefined;
}
