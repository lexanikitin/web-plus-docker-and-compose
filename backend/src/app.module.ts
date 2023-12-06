import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DBConfigFactory } from './config/DBConfig.factory';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfigFactory,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [DBConfigFactory],
})
export class AppModule {}
