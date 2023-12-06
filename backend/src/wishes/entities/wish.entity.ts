import { BasicEntity } from '../../common/entities/basic.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish extends BasicEntity {
  @Column({ length: 250 })
  @IsString()
  @MaxLength(250)
  @MinLength(1)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'float' })
  @IsNumber()
  price: number;

  @Column({ type: 'float', default: 0 })
  @IsNumber()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column({ length: 1024 })
  @IsString()
  @MaxLength(1024)
  @MinLength(1)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({ type: 'float', default: 0 })
  @IsNumber()
  copied: number;
}
