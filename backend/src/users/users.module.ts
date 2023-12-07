import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from '../wishes/entities/wish.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';
import { Offer } from '../offers/entities/offer.entity';
import { User } from './entities/user.entity';
import {WishesService} from "../wishes/wishes.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish, Wishlist, Offer])],
  controllers: [UsersController],
  providers: [UsersService,WishesService],
  exports: [UsersService],
})
export class UsersModule {}
