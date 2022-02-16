import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOneOrFail({
      where: {
        id: user_id
      },
      relations: ["games"]
    });

    return user;


  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query('select * from users u order by 1 asc;'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query(`select * from users u where lower(u.first_name) = lower("$1") and lower(u.last_name) = lower("$2");`, [first_name, last_name]); // Complete usando raw query
  }
}
