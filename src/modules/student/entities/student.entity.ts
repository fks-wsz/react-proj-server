import { CommonEntity } from 'src/common/entities/common.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student extends CommonEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({
    name: 'nickname',
    comment: '昵称',
    type: 'varchar',
    nullable: true,
  })
  nickname: string;

  @Column({
    name: 'real_name',
    comment: '真实姓名',
    type: 'varchar',
    nullable: false,
    default: '',
  })
  realName: string;

  @Column({
    name: 'phone_number',
    comment: '手机号',
    type: 'varchar',
    nullable: false,
    default: '',
  })
  phoneNumber: string;

  @Column({
    name: 'avatar_url',
    comment: '头像地址',
    type: 'varchar',
    nullable: true,
    default: '',
  })
  avatarUrl: string;

  @Column({
    name: 'accout',
    comment: '账户名',
    type: 'varchar',
    nullable: false,
    default: '',
  })
  account: string;

  @Column({
    name: 'password',
    comment: '账户密码',
    type: 'varchar',
    nullable: false,
    default: '',
  })
  password: string;

  @BeforeInsert()
  beforeColInsert() {
    // 如果没有账户名 且 有手机号 则账户名为手机号
    if (!this.account && this.phoneNumber) {
      this.account = this.phoneNumber;
    }
  }
}
