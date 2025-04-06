import CommonEntity from '../../../common/entities/common.entity';
import { Entity } from 'typeorm';

@Entity('product')
export class Product extends CommonEntity {}
