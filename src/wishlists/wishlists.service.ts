import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
    private wishesService: WishesService,
    private usersService: UsersService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, userId: number) {
    const { name, image, itemsIds, description } = createWishlistDto;
    const wishes: Wish[] = [];
    for (const id of itemsIds) {
      const wish = await this.wishesService.findOne(id);
      wishes.push(wish);
    }

    if (wishes.length !== itemsIds.length) {
      throw new BadRequestException('One or more wishes not found');
    }

    const owner = await this.usersService.findById(userId);

    return this.wishlistsRepository.save({
      name,
      image,
      description,
      items: wishes,
      owner,
    });
  }

  async findAll(userId: number) {
    return await this.wishlistsRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id: id },
      relations: { owner: true, items: true },
    });

    if (!wishlist) {
      throw new BadRequestException('Wishlist not found');
    }

    return wishlist;
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id: id },
      relations: { owner: true },
    });

    if (!wishlist) {
      throw new BadRequestException('Wishlist not found');
    }

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'You cannot update this wishlist, because you are not the owner',
      );
    }

    const { name, image, itemsIds, description } = updateWishlistDto;
    const wishes: Wish[] = [];
    for (const id of itemsIds) {
      const wish = await this.wishesService.findOne(id);
      wishes.push(wish);
    }

    if (wishes.length !== itemsIds.length) {
      throw new BadRequestException('One or more wishes not found');
    }

    wishlist.name = name;
    wishlist.image = image;
    wishlist.description = description;
    wishlist.items = wishes;

    return this.wishlistsRepository.save(wishlist);
  }

  async remove(id: number, userId: number) {
    const wishlist = await this.findOne(id);

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'You cannot delete this wishlist, because you are not the owner',
      );
    }

    return this.wishlistsRepository.remove(wishlist);
  }
}
