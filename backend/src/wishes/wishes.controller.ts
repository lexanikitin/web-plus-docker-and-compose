import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { GetUser } from '../common/decorators/getUser.decorator';
import { User } from '../users/entities/user.entity';
import { Public } from '../common/decorators/public.decorator';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@GetUser() user: User, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(user, createWishDto);
  }

  @Public()
  @Get('top')
  findTop() {
    return this.wishesService.findManyByKey('copied', 'ASC', 20);
  }

  @Public()
  @Get('last')
  findLast() {
    return this.wishesService.findManyByKey('createdAt', 'DESC', 40);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.update(+id, updateWishDto, user);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.wishesService.remove(+id, user);
  }

  @Post(':id/copy')
  copy(@GetUser() user: User, @Param('id') id: string) {
    return this.wishesService.copy(+id, user);
  }
}
