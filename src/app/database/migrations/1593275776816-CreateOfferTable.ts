import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateOfferTable1593275776816 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'offers',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'observation',
            type: 'varchar'
          },
          {
            name: 'event_id',
            type: 'integer'
          },
          {
            name: 'provider_id',
            type: 'integer'
          }
        ]
      })
    )

    await queryRunner.createForeignKey('offers', new TableForeignKey(
      {
        name: 'FK_offer_provider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        onDelete: 'SET NULL'
      }
    ))

    await queryRunner.createForeignKey('offers', new TableForeignKey(
      {
        name: 'FK_offer_event',
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'eventPrices',
        onDelete: 'SET NULL'
      }
    ))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lists', 'FK_offer_event')
    await queryRunner.dropForeignKey('users', 'FK_offer_provider')
    await queryRunner.dropTable('offers')
  }
}
