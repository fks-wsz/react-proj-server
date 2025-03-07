import { IsNotEmpty } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组件
 */
@Entity('user')
export class User extends CommonEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({
    comment: '昵称',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: '描述',
    default: '',
  })
  desc: string;

  @Column({
    name: 'phone_number',
    comment: '手机号',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'avatar_url',
    comment: '头像OSS地址',
    nullable: true,
  })
  avatarUrl: string;

  @Column({
    comment: '密码',
    nullable: true,
  })
  password: string;

  @Column({
    comment: '账户',
    nullable: true,
  })
  account: string;

  @Column({
    name: 'login_code',
    comment: '登录验证码',
    nullable: true,
  })
  loginCode: string;

  @Column({
    name: 'login_code_create_at',
    comment: '登录验证码创建时间',
    nullable: true,
    type: 'datetime',
  })
  loginCodeCreateAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateLoginCodeCreateAt() {
    if (this.loginCode) {
      // 生成验证码时，同时更新验证码创建时间
      this.loginCodeCreateAt = new Date();
    }
  }
}
