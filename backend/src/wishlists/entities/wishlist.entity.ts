import { BasicEntity } from '../../common/entities/basic.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Wishlist extends BasicEntity {
  @Column({ length: 250 })
  @MaxLength(250)
  @MinLength(1)
  @IsString()
  name: string;

  @Column({ length: 1500 })
  @MaxLength(1500)
  @IsString()
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.name)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
