import {BasicEntity} from '../../common/entities/basic.entity';
import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany} from 'typeorm';
import {
    IsEmail,
    IsString,
    IsUrl,
    MaxLength,
    MinLength,
} from 'class-validator';
import {Wish} from '../../wishes/entities/wish.entity';
import {Offer} from '../../offers/entities/offer.entity';
import {Wishlist} from '../../wishlists/entities/wishlist.entity';
import {hash} from 'bcrypt';
import {Exclude} from 'class-transformer';

@Entity()
export class User extends BasicEntity {
    @Column({unique: true, length: 30})
    @IsString()
    @MaxLength(30)
    @MinLength(2)
    username: string;

    @Column({default: 'Пока ничего не рассказал о себе', length: 200})
    @IsString()
    @MaxLength(200)
    @MinLength(2)
    about: string;

    @Column({default: 'https://i.pravatar.cc/300'})
    @IsUrl()
    avatar: string;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @Exclude()
    password: string;

    @OneToMany(
        () => Wish,
        (wish) => {
            wish.owner;
        })
    wishes: Wish[];

    @OneToMany(
        () => Offer,
        (offer) => {
            offer.user;
        },
    )
    offers: Offer[];

    @OneToMany(
        () => Wishlist,
        (wishlist) => {
            wishlist.owner;
        },
    )
    wishlists: Wishlist[];

    @BeforeInsert()
    private async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }
}
