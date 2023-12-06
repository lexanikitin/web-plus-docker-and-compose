import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigFactory } from '../config/JWTConfig.factory';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useClass: JWTConfigFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    JWTConfigFactory,
  ],
})
export class AuthModule {}
