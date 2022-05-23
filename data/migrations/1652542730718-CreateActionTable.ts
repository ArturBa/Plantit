/* eslint-disable class-methods-use-this */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const tableName = 'actions';

export class CreateActionTable1652542730718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'plantId',
            type: 'integer',
          },
          {
            name: 'type',
            type: 'string',
          },
          {
            name: 'frequency',
            type: 'integer',
          },
          {
            name: 'period',
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
    const foreignKey = new TableForeignKey({
      name: 'fk_actions_plant',
      columnNames: ['plantId'],
      referencedTableName: 'plants',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey(tableName, foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
