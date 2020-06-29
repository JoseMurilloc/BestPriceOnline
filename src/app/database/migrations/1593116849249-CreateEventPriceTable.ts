import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class CreateEventPriceTable1593116849249 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'eventPrices',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'date_end',
            type: 'timestamp with time zone'
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'observation',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'integer'
          },
          {
            name: 'list_id',
            type: 'integer'
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )

    await queryRunner.createForeignKey('eventPrices', new TableForeignKey(
      {
        name: 'FK_eventPrice_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL'
      }
    ))

    await queryRunner.createForeignKey('eventPrices', new TableForeignKey(
      {
        name: 'FK_eventPrices_list',
        columnNames: ['list_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lists',
        onDelete: 'SET NULL'
      }
    ))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lists', 'FK_eventPrices_list')
    await queryRunner.dropForeignKey('users', 'FK_eventPrices_user')
    await queryRunner.dropTable('categories')
  }
}
