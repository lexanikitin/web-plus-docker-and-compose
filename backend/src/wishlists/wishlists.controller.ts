import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { GetUser } from '../common/decorators/getUser.decorator';
import { User } from '../users/entities/user.entity';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Post()
  create(@GetUser() user: User, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.update(+id, updateWishlistDto, user);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.wishlistsService.remove(+id, user);
  }
}
