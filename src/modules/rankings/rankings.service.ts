import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from '../../domain/entities/ranking.entity';

@Injectable()
export class RankingsService {
  constructor(@InjectRepository(Ranking) private repo: Repository<Ranking>) {}
  list(weightClass: string) {
    return this.repo.find({ where: { weightClass }, order: { rank: 'ASC' } });
  }
}
