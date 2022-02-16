import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private userRepository: Repository<User>;

  
  


  constructor() {
    this.repository = getRepository(Game);
    this.userRepository = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder('game')
      .where("game.title ilike :title ", { title: param })
      .getMany()
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`select count(1) as count from games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    
    const  user = await this.userRepository
    .createQueryBuilder("game")
    .innerJoin("game.users", "users")
    .where("game.id = :id", {id})
    .getMany();

    return user
    // Complete usando query builder
  }
}
