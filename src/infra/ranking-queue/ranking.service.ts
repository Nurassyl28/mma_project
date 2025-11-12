import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, Optional } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class RankingQueueService {
  private readonly logger = new Logger(RankingQueueService.name);

  constructor(@Optional() @InjectQueue('ranking') private queue?: Queue) {}

  enqueueRecompute(weightClass: string, lastActivity: Date) {
    if (!this.queue) {
      this.logger.debug(`Ranking queue disabled; skipping recompute for ${weightClass}`);
      return;
    }
    return this.queue.add('recompute', { weightClass, lastActivity }, { removeOnComplete: true, attempts: 3 });
  }
}
