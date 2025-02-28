import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740467831092 implements MigrationInterface {
    name = 'Migration1740467831092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT '昵称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '描述' DEFAULT '', \`tel\` varchar(255) NULL COMMENT '手机号', \`password\` varchar(255) NULL COMMENT '密码', \`account\` varchar(255) NULL COMMENT '账户', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
