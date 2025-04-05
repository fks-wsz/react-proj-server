import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1743584129425 implements MigrationInterface {
  name = 'Migration1743584129425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP, \`created_by\` varchar(255) NULL COMMENT '创建人', \`updated_at\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL COMMENT '更新人', \`deleted_at\` timestamp(6) NULL COMMENT '删除时间', \`deleted_by\` varchar(255) NULL COMMENT '删除操作人', \`name\` varchar(255) NOT NULL COMMENT '昵称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '描述' DEFAULT '', \`phone_number\` varchar(255) NULL COMMENT '手机号', \`avatar_url\` varchar(255) NULL COMMENT '头像OSS地址', \`password\` varchar(255) NULL COMMENT '密码', \`account\` varchar(255) NULL COMMENT '账户', \`login_code\` varchar(255) NULL COMMENT '登录验证码', \`login_code_create_at\` datetime NULL COMMENT '登录验证码创建时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`student\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP, \`created_by\` varchar(255) NULL COMMENT '创建人', \`updated_at\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL COMMENT '更新人', \`deleted_at\` timestamp(6) NULL COMMENT '删除时间', \`deleted_by\` varchar(255) NULL COMMENT '删除操作人', \`nickname\` varchar(255) NULL COMMENT '昵称', \`real_name\` varchar(255) NOT NULL COMMENT '真实姓名' DEFAULT '', \`phone_number\` varchar(255) NOT NULL COMMENT '手机号' DEFAULT '', \`avatar_url\` varchar(255) NULL COMMENT '头像地址' DEFAULT '', \`account\` varchar(255) NOT NULL COMMENT '账户名' DEFAULT '', \`password\` varchar(255) NOT NULL COMMENT '账户密码' DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`org_image\` (\`id\` varchar(36) NOT NULL, \`url\` text NOT NULL COMMENT '图片地址', \`remark\` varchar(255) NULL COMMENT '备注', \`org_id_for_front\` varchar(36) NULL, \`org_id_for_room\` varchar(36) NULL, \`org_id_for_other\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP, \`created_by\` varchar(255) NULL COMMENT '创建人', \`updated_at\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL COMMENT '更新人', \`deleted_at\` timestamp(6) NULL COMMENT '删除时间', \`deleted_by\` varchar(255) NULL COMMENT '删除操作人', \`business_license_url\` text NOT NULL COMMENT '营业执照', \`id_card_front_url\` text NOT NULL COMMENT '身份证正面', \`id_card_back_url\` text NOT NULL COMMENT '身份证反面', \`tags\` text NULL COMMENT '标签 逗号分隔', \`description\` text NULL COMMENT '机构简介', \`organization_name\` varchar(50) NOT NULL COMMENT '机构名称', \`logo_url\` text NULL COMMENT '门店logo', \`address\` text NULL COMMENT '地址', \`longitude\` text NULL COMMENT '经度', \`latitude\` text NULL COMMENT '经度', \`phone_number\` varchar(30) NULL COMMENT '电话', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`course\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP, \`created_by\` varchar(255) NULL COMMENT '创建人', \`updated_at\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL COMMENT '更新人', \`deleted_at\` timestamp(6) NULL COMMENT '删除时间', \`deleted_by\` varchar(255) NULL COMMENT '删除操作人', \`name\` varchar(255) NOT NULL COMMENT '课程名称', \`description\` text NULL COMMENT '课程简介', \`fit_people\` varchar(255) NOT NULL COMMENT '适宜人群', \`base_ability\` varchar(255) NOT NULL COMMENT '适合基础', \`sections\` smallint NOT NULL COMMENT '课程节数', \`section_duration\` smallint NOT NULL COMMENT '单节课时长(min)', \`stu_count\` int NOT NULL COMMENT '学员数量' DEFAULT '0', \`reserver_info\` text NULL COMMENT '预约信息', \`refund_info\` text NULL COMMENT '退款信息', \`other_info\` text NULL COMMENT '其他说明信息', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`org_image\` ADD CONSTRAINT \`FK_0cdd1b3b3ab3b146a24fbe7130c\` FOREIGN KEY (\`org_id_for_front\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`org_image\` ADD CONSTRAINT \`FK_48579cb717dce12981ce2a5052b\` FOREIGN KEY (\`org_id_for_room\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`org_image\` ADD CONSTRAINT \`FK_39e7d7ffc5a66501689026253d1\` FOREIGN KEY (\`org_id_for_other\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`org_image\` DROP FOREIGN KEY \`FK_39e7d7ffc5a66501689026253d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`org_image\` DROP FOREIGN KEY \`FK_48579cb717dce12981ce2a5052b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`org_image\` DROP FOREIGN KEY \`FK_0cdd1b3b3ab3b146a24fbe7130c\``,
    );
    await queryRunner.query(`DROP TABLE \`course\``);
    await queryRunner.query(`DROP TABLE \`organization\``);
    await queryRunner.query(`DROP TABLE \`org_image\``);
    await queryRunner.query(`DROP TABLE \`student\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
