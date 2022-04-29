/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'plants';

export class CreatePlantsTable1650721556938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          // {
          //   name: 'id',
          //   type: 'integer',
          //   isPrimary: true,
          //   isGenerated: true,
          // },
          {
            name: 'name',
            type: 'string',
            isNullable: true,
          },
          {
            name: 'nickname',
            type: 'string',
          },
          {
            name: 'photoUrl',
            type: 'string',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
