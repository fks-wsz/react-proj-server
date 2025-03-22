import { IsDate, IsOptional, validateOrReject } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn } from 'typeorm';

export class CommonEntity {
  @Column({
    name: 'created_at',
    comment: '创建时间',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'created_by',
    comment: '创建人',
    type: 'varchar',
    nullable: true,
  })
  createdBy: string;

  @Column({
    name: 'updated_at',
    comment: '更新时间',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    name: 'updated_by',
    comment: '更新人',
    type: 'varchar',
    nullable: true,
  })
  updatedBy: string;

  @IsDate()
  @IsOptional()
  @DeleteDateColumn({
    name: 'deleted_at',
    comment: '删除时间',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @IsOptional()
  @Column({
    name: 'deleted_by',
    comment: '删除操作人',
    type: 'varchar',
    nullable: true,
  })
  deletedBy: string;

  @BeforeInsert()
  async beforeInsert() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
    await validateOrReject(this);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedAt = new Date();
    await validateOrReject(this, { skipMissingProperties: true });
  }
}
