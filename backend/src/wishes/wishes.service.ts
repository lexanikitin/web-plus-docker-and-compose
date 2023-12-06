import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
    private readonly dataSource: DataSource,
  ) {}

  async create(owner: User, createWishDto: CreateWishDto) {
    const newWish = this.wishesRepository.create({ owner, ...createWishDto });
    return this.wishesRepository.save(newWish);
  }

  async findManyByKey(
    key: 'copied' | 'createdAt',
    sortOrder: 'ASC' | 'DESC',
    quantity: number,
  ): Promise<Wish[]> {
    return await this.wishesRepository.find({
      order: { [key]: sortOrder },
      take: quantity,
    });
  }

  async findOne(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: ['owner', 'offers'],
    });
    if (!wish) {
      throw new NotFoundException(`Подарок с ID=${id} на найден.`);
    } else {
      return wish;
    }
  }

  async update(id: number, updateWishDto: UpdateWishDto, user: User) {
    const wish = await this.findOne(id);
    if (wish.owner.id !== user.id) {
      throw new ForbiddenException(`Можно редактировать только свои желания.`);
    }
    if (updateWishDto.price && wish.offers) {
      throw new ForbiddenException(
        `Стоимость нельзя изменить , если уже кто-то пожелал участвовать.`,
      );
    }
    const newWish = await this.wishesRepository.update(id, updateWishDto);
    if (newWish.affected === 0) {
      throw new InternalServerErrorException(
        'Ошибка при изменении данных желания',
      );
    } else {
      return {};
    }
  }

  async remove(id: number, user: User) {
    const wish = await this.findOne(id);
    if (wish.owner.id !== user.id) {
      throw new ForbiddenException(`Можно удалять только свои желания.`);
    }
    await this.wishesRepository.delete(id);
    return wish;
  }

  async copy(id: number, user: User) {
    const wish = await this.findOne(id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    if (wish.owner.id === user.id) {
      throw new ForbiddenException(`Зачем копировать свой подарок?`);
    }
    try {
      const newWish = this.wishesRepository.create({
        owner: user,
        name: wish.name,
        link: wish.link,
        image: wish.image,
        description: wish.description,
        price: wish.price,
      });
      await this.wishesRepository.save(newWish);
      await this.wishesRepository.update(id, { copied: wish.copied + 1 });
      await queryRunner.commitTransaction();
      return {};
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(`Внутренняя ошибка сервера. ${e}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findManyByIdList(idList: number[]) {
    try {
      return await this.wishesRepository.find({
        where: { id: In(idList) },
      });
    } catch (e) {
      throw new NotFoundException(`Пожелания не найдены`);
    }
  }

  async updateRaised(id: number, newRaised: number) {
    const wish = await this.wishesRepository.update(id, {
      raised: newRaised,
    });
    if (wish.affected === 0) {
      throw new NotFoundException(
        `Ошибка при обновлении данных подарка. ${id}`,
      );
    } else {
      return {};
    }
  }
}
