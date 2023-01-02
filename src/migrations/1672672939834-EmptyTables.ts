import { MigrationInterface, QueryRunner } from "typeorm";

export class EmptyTables1672672939834 implements MigrationInterface {
    name = 'EmptyTables1672672939834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_on" datetime NOT NULL DEFAULT (datetime('now')), "from" varchar NOT NULL, "to" varchar NOT NULL, "customText" varchar, "date" datetime NOT NULL, "channel" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
