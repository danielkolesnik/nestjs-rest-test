import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1626278505816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS users (
                    id serial,
                    name varchar (127),
                    created_at timestamp without time zone DEFAULT now(),
                    updated_at timestamp without time zone DEFAULT now(),
                    
                    CONSTRAINT pk_users PRIMARY KEY (id)
                 );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query(`DROP TABLE IF EXISTS user;`);
  }
}
