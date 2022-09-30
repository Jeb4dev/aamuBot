import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1664564957179 implements MigrationInterface {
    name = 'InitialMigration1664564957179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skills" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "image_path" character varying NOT NULL DEFAULT 'static/img/skills/skills_placeholder.png', "emoji" character varying NOT NULL, "minimum_level" integer NOT NULL DEFAULT '1', "maximum_level" integer NOT NULL DEFAULT '999', "base_experience" integer NOT NULL DEFAULT '10', "growth_rate" integer NOT NULL DEFAULT '2', CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_skills" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "level" integer NOT NULL DEFAULT '1', "experience" integer NOT NULL DEFAULT '0', "skillId" integer, "userId" character varying, CONSTRAINT "PK_cce72672e5f2352fe8b8040c221" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "player_skills" ADD CONSTRAINT "FK_fb2553f59f5f25190ed4c5601db" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_skills" ADD CONSTRAINT "FK_56b3af6564c32c1ea8321ef3230" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player_skills" DROP CONSTRAINT "FK_56b3af6564c32c1ea8321ef3230"`);
        await queryRunner.query(`ALTER TABLE "player_skills" DROP CONSTRAINT "FK_fb2553f59f5f25190ed4c5601db"`);
        await queryRunner.query(`DROP TABLE "player_skills"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "skills"`);
    }

}
