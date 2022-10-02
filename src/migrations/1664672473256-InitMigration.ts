import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1664672473256 implements MigrationInterface {
    name = 'InitMigration1664672473256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skills" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "image_path" character varying NOT NULL DEFAULT 'static/img/skills/skills_placeholder.png', "emoji" character varying NOT NULL, "minimum_level" integer NOT NULL DEFAULT '1', "maximum_level" integer NOT NULL DEFAULT '999', "base_experience" integer NOT NULL DEFAULT '10', "growth_rate" integer NOT NULL DEFAULT '2', CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "userId" character varying, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_skills" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "level" integer NOT NULL DEFAULT '1', "experience" integer NOT NULL DEFAULT '0', "skillId" integer, "profileId" integer, CONSTRAINT "PK_cce72672e5f2352fe8b8040c221" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "selected_profile" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying, "profileId" integer, CONSTRAINT "REL_e248ec1236476e8a2e2ab09bc8" UNIQUE ("userId"), CONSTRAINT "REL_8fc7a9df1d50832f8dc2294431" UNIQUE ("profileId"), CONSTRAINT "PK_f64926a91c595558a88ac20246a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "gold" integer NOT NULL DEFAULT '0', "silver" integer NOT NULL DEFAULT '0', "bronze" integer NOT NULL DEFAULT '0', "comment" character varying NOT NULL DEFAULT 'Undefined transaction.', "userId" character varying, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallets" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "gold" integer NOT NULL DEFAULT '0', "silver" integer NOT NULL DEFAULT '0', "bronze" integer NOT NULL DEFAULT '0', "profileId" integer, CONSTRAINT "REL_e9859da4d2955d88d211e3d527" UNIQUE ("profileId"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_skills" ADD CONSTRAINT "FK_fb2553f59f5f25190ed4c5601db" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_skills" ADD CONSTRAINT "FK_592743d3c6923f2db416c6749d0" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "selected_profile" ADD CONSTRAINT "FK_e248ec1236476e8a2e2ab09bc8b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "selected_profile" ADD CONSTRAINT "FK_8fc7a9df1d50832f8dc2294431d" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_e9859da4d2955d88d211e3d527d" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_e9859da4d2955d88d211e3d527d"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`ALTER TABLE "selected_profile" DROP CONSTRAINT "FK_8fc7a9df1d50832f8dc2294431d"`);
        await queryRunner.query(`ALTER TABLE "selected_profile" DROP CONSTRAINT "FK_e248ec1236476e8a2e2ab09bc8b"`);
        await queryRunner.query(`ALTER TABLE "player_skills" DROP CONSTRAINT "FK_592743d3c6923f2db416c6749d0"`);
        await queryRunner.query(`ALTER TABLE "player_skills" DROP CONSTRAINT "FK_fb2553f59f5f25190ed4c5601db"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "selected_profile"`);
        await queryRunner.query(`DROP TABLE "player_skills"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "skills"`);
    }

}
