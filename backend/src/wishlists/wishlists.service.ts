import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private wishesService: WishesService,
  ) {}

  async findAll() {
    const wishlists = await this.wishlistRepository.find({
      relations: {
        owner: true,
        items: true,
      },
      select: {
        owner: {
          id: true,
          createdAt: true,
          updatedAt: true,
          username: true,
          about: true,
          avatar: true,
        },
      },
    });
    if (!wishlists) {
      throw new NotFoundException('Списков пожеланий не найдено');
    } else {
      return wishlists;
    }
  }

  async create(createWishlistDto: CreateWishlistDto, owner: User) {
    console.log(createWishlistDto);
    try {
      const wishes = createWishlistDto.itemsId
        ? await this.wishesService.findManyByIdList(createWishlistDto.itemsId)
        : [];
      console.log(wishes);
      return await this.wishlistRepository.save({
        items: wishes,
        owner: owner,
        name: createWishlistDto.name,
        image: createWishlistDto.image,
        description: createWishlistDto.description,
      });
    } catch (e) {
      throw new BadRequestException(`Ошибка при создании списка желаний ${e}`);
    }
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        items: true,
      },
      select: {
        owner: {
          id: true,
          createdAt: true,
          updatedAt: true,
          username: true,
          about: true,
          avatar: true,
        },
      },
    });
    if (!wishlist) {
      throw new NotFoundException('Список пожеланий не найден');
    } else {
      return wishlist;
    }
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto, user: User) {
    const list = await this.findOne(id);
    if (list.owner.id !== user.id) {
      throw new ForbiddenException(`Можно редактировать только свои списки.`);
    }
    const newList = await this.wishlistRepository.update(id, updateWishlistDto);
    if (newList.affected === 0) {
      throw new InternalServerErrorException(
        'Ошибка при изменении данных списка',
      );
    } else {
      return newList;
    }
  }

  async remove(id: number, user: User) {
    const list = await this.findOne(id);
    if (list.owner.id !== user.id) {
      throw new ForbiddenException(`Можно удалять только свои списки.`);
    }
    await this.wishlistRepository.delete(id);
    return list;
  }
}
