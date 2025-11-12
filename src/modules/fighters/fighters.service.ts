import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Fighter } from '../../domain/entities/fighter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFighterInput } from './dto/create-fighter.input';
import { Fight } from '../../domain/entities/fight.entity';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter) private repo: Repository<Fighter>,
    @InjectRepository(Fight) private fights: Repository<Fight>
  ) {}
  create(dto: CreateFighterInput) { return this.repo.save(this.repo.create(dto)); }
  findAll() { return this.repo.find(); }
  findBySlug(slug: string) { return this.repo.findOneBy({ slug }); }
  historyForFighter(fighterId: string) {
    return this.fights.find({
      where: [
        { redFighter: { id: fighterId } },
        { blueFighter: { id: fighterId } }
      ],
      relations: ['event', 'redFighter', 'blueFighter'],
      order: { event: { date: 'DESC' } }
    });
  }
}
