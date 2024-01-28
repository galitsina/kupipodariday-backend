import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}

  async create(userId: number, createWishDto: CreateWishDto) {
    const owner = await this.usersService.findById(userId);
    const wish = await this.wishesRepository.create({
      ...createWishDto,
      owner,
    });
    return this.wishesRepository.save(wish);
  }

  async returnLast() {
    return this.wishesRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  async returnTopWishes() {
    return this.wishesRepository.find({
      order: { copied: 'DESC' },
      take: 20,
    });
  }

  async findOne(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id: id },
      relations: { owner: true, offers: true },
    });

    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    return wish;
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    const wish = await this.wishesRepository.preload({
      id: id,
      ...updateWishDto,
    });

    if (wish.offers.length > 0 && updateWishDto.price) {
      throw new NotFoundException(
        'You cannot change price of wish with offers',
      );
    }

    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    return this.wishesRepository.save(wish);
  }

  async removeById(id: number) {
    const wish = await this.findOne(id);
    return this.wishesRepository.remove(wish);
  }

  async copyWish(wishId: number, userId: number) {
    const wish = await this.findOne(wishId);

    if (!wish) {
      throw new NotFoundException('Wish not found');
    }

    const owner = wish.owner.id;

    if (owner === userId) {
      throw new NotFoundException('You cannot copy your own wish');
    }

    wish.copied += 1;

    const user = await this.usersService.findById(userId);
    const copy = await this.wishesRepository.create({
      ...wish,
      owner: user,
      copied: 0,
      id: undefined,
    });

    this.wishesRepository.save(wish);
    return this.wishesRepository.save(copy);
  }
}
