import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from '../../domain/entities/fight.entity';
import { Ranking } from '../../domain/entities/ranking.entity';
import { Fighter } from '../../domain/entities/fighter.entity';
import { Method } from '../../domain/enums/method.enum';

@Processor('ranking')
export class RankingProcessor extends WorkerHost {
  constructor(
    @InjectRepository(Fight) private fights: Repository<Fight>,
    @InjectRepository(Ranking) private ranks: Repository<Ranking>,
    @InjectRepository(Fighter) private fighters: Repository<Fighter>
  ) { super(); }

  async process(job: Job<{weightClass: string, lastActivity: Date}>) {
    const wc = job.data.weightClass;

    const finalized = await this.fights.find({ where: { weightClass: wc, isFinalized: true } });

    const stats = new Map<string, { points: number; wins: number; losses: number; draws: number; last: Date }>();

    const addPoints = (winnerId: string|undefined, redId: string, blueId: string, method?: Method, eventDate?: Date) => {
      const pFor = (method === Method.KO_TKO || method === Method.SUBMISSION) ? 4 :
                   (method === Method.DECISION) ? 3 :
                   (method === Method.DRAW) ? 1 : 0;

      const ensure = (id: string) => {
        if (!stats.has(id)) stats.set(id, { points: 0, wins: 0, losses: 0, draws: 0, last: new Date(0) });
        return stats.get(id)!;
      };

      const red = ensure(redId);
      const blue = ensure(blueId);

      if (winnerId === redId) { red.points += pFor; red.wins++; blue.losses++; }
      else if (winnerId === blueId) { blue.points += pFor; blue.wins++; red.losses++; }
      else { red.points += 1; blue.points += 1; red.draws++; blue.draws++; }

      const d = eventDate ?? new Date();
      if (d > red.last) red.last = d;
      if (d > blue.last) blue.last = d;
    };

    for (const f of finalized) {
      addPoints(f.winnerId, f.redFighter.id, f.blueFighter.id, f.method, f.event.date);
    }

    for (const [fighterId, s] of stats.entries()) {
      const fighter = await this.fighters.findOneByOrFail({ id: fighterId });
      let row = await this.ranks.findOne({ where: { fighter: { id: fighterId }, weightClass: wc } });
      if (!row) row = this.ranks.create({ fighter, weightClass: wc });
      row.points = s.points; row.wins = s.wins; row.losses = s.losses; row.draws = s.draws; row.lastActivity = s.last;
      await this.ranks.save(row);
    }

    const all = await this.ranks.find({ where: { weightClass: wc } });
    const withRatio = all.map(r => ({ r, ratio: (r.wins + r.losses + r.draws) ? r.wins / (r.wins + r.losses + r.draws) : 0 }));
    withRatio.sort((a, b) => (
      b.r.points - a.r.points ||
      b.ratio - a.ratio ||
      ((b.r.lastActivity?.getTime() ?? 0) - (a.r.lastActivity?.getTime() ?? 0))
    ));
    for (let i = 0; i < withRatio.length; i++) {
      withRatio[i].r.rank = i + 1;
      await this.ranks.save(withRatio[i].r);
    }
  }
}
