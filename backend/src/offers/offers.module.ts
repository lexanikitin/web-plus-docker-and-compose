import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { Offer } from './entities/offer.entity';
import { WishesService } from '../wishes/wishes.service';
import { WishesModule } from '../wishes/wishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish, Offer]), WishesModule],
  controllers: [OffersController],
  providers: [OffersService, WishesService],
})
export class OffersModule {}
