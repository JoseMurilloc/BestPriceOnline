import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class JoinEventAndProviders1593268876453 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providerEventPrices',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
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

    await queryRunner.createForeignKey('providerEventPrices', new TableForeignKey(
      {
        name: 'FK_providerEventPrice_provider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        onDelete: 'SET NULL'
      }
    ))

    await queryRunner.createForeignKey('providerEventPrices', new TableForeignKey(
      {
        name: 'FK_providerEventPrice_list',
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'eventPrices',
        onDelete: 'SET NULL'
      }
    ))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lists', 'FK_providerEventPrice_list')
    await queryRunner.dropForeignKey('users', 'FK_providerEventPrice_provider')
    await queryRunner.dropTable('providerEventPrices')
  }
}
