import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {QueryFailedError, Repository} from 'typeorm';
import {UserProfileResponceDto} from './dto/responce/user-profile-responce.dto';
import {hash} from "bcrypt";
import {WishesService} from "../wishes/wishes.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = await this.usersRepository.create(createUserDto);
            return this.usersRepository.save(user);
        } catch (e) {
            if (e instanceof QueryFailedError) {
                throw new BadRequestException(
                    'Пользователь с таким email уже существует',
                );
            } else {
                throw new InternalServerErrorException(`Ошибка сервера. ${e}`);
            }
        }
    }

    async findByUsername(username: string): Promise<UserProfileResponceDto> {
        return await this.usersRepository.findOne({where: {username}});
    }

    async findById(id: number): Promise<UserProfileResponceDto> {
        return await this.usersRepository.findOne({where: {id}});
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            const newHashPassword = await hash(updateUserDto.password, 10);
            updateUserDto = {...updateUserDto, password: newHashPassword};
        }
        try {
            const res = await this.usersRepository.update({id}, updateUserDto);
            if (res.affected === 0) {
                throw new InternalServerErrorException(
                    'Ошибка при изменении данных профиля'
                );
            }
        } catch (e) {
            if (e instanceof QueryFailedError) {
                throw new BadRequestException(
                    'Пользователь с таким username или email уже существует',
                );
            } else {
                throw new InternalServerErrorException(`Ошибка сервера. ${e}`);
            }
        }
        return await this.usersRepository.findOneOrFail({where: {id}});
    }

    async findMany(value: string): Promise<UserProfileResponceDto> {
        const user = await this.usersRepository.findOne({
            where: {
                [value.includes('@') ? 'email' : 'username']: value,
            },
        });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        return user;
    }

    async findOneByKey(key: 'id' | 'username', value: string | number) {
        const user = await this.usersRepository.findOne({
            where: {[key]: value},
        });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        return user;
    }
}
