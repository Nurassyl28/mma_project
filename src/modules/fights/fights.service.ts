import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fight } from '../../domain/entities/fight.entity';
import { Event } from '../../domain/entities/event.entity';
import { Fighter } from '../../domain/entities/fighter.entity';
import { Repository } from 'typeorm';
import { CreateFightInput } from './dto/create-fight.input';
import { ReportResultInput } from './dto/report-result.input';
import { RankingQueueService } from '../../infra/ranking-queue/ranking.service';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight) private fights: Repository<Fight>,
    @InjectRepository(Event) private events: Repository<Event>,
    @InjectRepository(Fighter) private fighters: Repository<Fighter>,
    private rankingQueue: RankingQueueService
  ) {}

  async create(dto: CreateFightInput) {
    const event = await this.events.findOneByOrFail({ id: dto.eventId });
    const red = await this.fighters.findOneByOrFail({ id: dto.redFighterId });
    const blue = await this.fighters.findOneByOrFail({ id: dto.blueFighterId });
    const fight = this.fights.create({
      event,
      redFighter: red,
      blueFighter: blue,
      weightClass: dto.weightClass
    });
    return this.fights.save(fight);
  }

  async reportResult(input: ReportResultInput) {
    const fight = await this.fights.findOne({
      where: { id: input.fightId },
      relations: ['event']
    });
    if (!fight) throw new NotFoundException(`Бой ${input.fightId} не найден. Используйте id из createFight.`);
    fight.winnerId = input.winnerId;
    fight.method = input.method;
    fight.round = input.round;
    fight.time = input.time;
    fight.isFinalized = true;
    await this.fights.save(fight);
    await this.rankingQueue.enqueueRecompute(fight.weightClass, fight.event.date);
    return fight;
  }

  async history(limit = 20) {
    const take = Math.min(Math.max(limit ?? 20, 1), 100);
    const fights = await this.fights.find({ relations: ['event', 'redFighter', 'blueFighter'] });
    return fights
      .filter((fight) => fight.isFinalized)
      .sort((a, b) => {
        const dateDiff = (b.event?.date?.getTime?.() ?? 0) - (a.event?.date?.getTime?.() ?? 0);
        if (dateDiff !== 0) return dateDiff;
        return b.id.localeCompare(a.id);
      })
      .slice(0, take);
  }
}
