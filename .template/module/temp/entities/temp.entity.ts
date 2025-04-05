import CommonEntity from '../../../common/entities/common.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('temp')
export class Temp extends CommonEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
}
