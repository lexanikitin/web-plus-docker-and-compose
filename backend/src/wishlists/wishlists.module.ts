import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Wishlist } from './entities/wishlist.entity';
import { WishesService } from '../wishes/wishes.service';
import { WishesModule } from '../wishes/wishes.module';
import { Wish } from '../wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wishlist, Wish]), WishesModule],
  controllers: [WishlistsController],
  providers: [WishlistsService, WishesService],
})
export class WishlistsModule {}
