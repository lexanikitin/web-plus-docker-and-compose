import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetUser } from '../common/decorators/getUser.decorator';
import { User } from '../users/entities/user.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@GetUser() user: User, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto, user);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
