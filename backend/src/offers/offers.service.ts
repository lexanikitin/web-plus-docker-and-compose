import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto, owner: User) {
    const wish = await this.wishesService.findOne(createOfferDto.itemId);
    if (wish.owner.id === owner.id) {
      throw new ForbiddenException(`Нельзя скидываться на подарок себе.`);
    }
    const totalRaised = wish.raised + createOfferDto.amount;
    if (totalRaised > wish.price) {
      throw new ForbiddenException(
        `Сумма участия больше стоимости подарка, уменьшите сумму.`,
      );
    }
    await this.wishesService.updateRaised(wish.id, totalRaised);
    try {
      return await this.offersRepository.save({
        owner,
        item: wish,
        amount: createOfferDto.amount,
      });
    } catch (e) {
      throw new BadRequestException(
        `Ошибка при создании заявки на участие в подарке.${e}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.offersRepository.find({
        relations: {
          user: true,
          item: true,
        },
        select: {
          user: {
            id: true,
            createdAt: true,
            updatedAt: true,
            username: true,
            about: true,
            avatar: true,
            email: true,
          },
        },
      });
    } catch (e) {
      throw new NotFoundException(`Заявок скинуться не найдено. ${e}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.offersRepository.findOne({
        where: { id },
        relations: {
          user: true,
          item: true,
        },
        select: {
          user: {
            id: true,
            createdAt: true,
            updatedAt: true,
            username: true,
            about: true,
            avatar: true,
            email: true,
          },
        },
      });
    } catch (e) {
      throw new NotFoundException(`Заявка не найдена. ${e}`);
    }
  }
}
