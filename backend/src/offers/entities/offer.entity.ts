import { BasicEntity } from '../../common/entities/basic.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsBoolean, IsNumber } from 'class-validator';
@Entity()
export class Offer extends BasicEntity {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({ type: 'float' })
  @IsNumber()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
