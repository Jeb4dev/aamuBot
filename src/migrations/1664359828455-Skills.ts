import { MigrationInterface, QueryRunner } from "typeorm";

export class Skills1664359828455 implements MigrationInterface {
    name = 'Skills1664359828455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skills" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "imagePath" character varying NOT NULL, "emoji" character varying NOT NULL, "minimumLevel" integer NOT NULL, "maximumLevel" integer NOT NULL, "experienceForLevel" integer NOT NULL, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_skills" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "level" integer NOT NULL, "experience" integer NOT NULL, "skillId" integer, "userId" character varying, CONSTRAINT "PK_cce72672e5f2352fe8b8040c221" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "player_skills" ADD CONSTRAINT "FK_fb2553f59f5f25190ed4c5601db" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_skills" ADD CONSTRAINT "FK_56b3af6564c32c1ea8321ef3230" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player_skills" DROP CONSTRAINT "FK_56b3af6564c32c1ea8321ef3230"`);
        await queryRunner.query(`ALTER TABLE "player_skills" DROP CONSTRAINT "FK_fb2553f59f5f25190ed4c5601db"`);
        await queryRunner.query(`DROP TABLE "player_skills"`);
        await queryRunner.query(`DROP TABLE "skills"`);
    }

}
