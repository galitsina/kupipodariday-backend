import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private dataSource: DataSource,
  ) {}

  async create(createOfferDto: CreateOfferDto, userId: number) {
    const { amount, itemId } = createOfferDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const owner = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });

      if (!owner) {
        throw new BadRequestException('User not found');
      }

      const wish = await queryRunner.manager.findOne(Wish, {
        where: { id: itemId },
      });

      const raised: number = amount + wish.raised;
      if (raised > wish.price) {
        throw new BadRequestException({
          message: 'Offer amount is too high',
          raised: raised,
          price: wish.price,
        });
      }
      wish.raised = raised;

      await queryRunner.manager.update(Wish, itemId, { raised });
      await queryRunner.commitTransaction();
      return await this.offersRepository.save({
        ...createOfferDto,
        user: owner,
        amount,
        item: wish,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.offersRepository.find({
      where: { hidden: false },
      relations: { user: true, item: true },
    });
  }

  async findOne(id: number) {
    return await this.offersRepository.findOne({
      where: { id: id },
      relations: { user: true, item: true },
    });
  }
}
