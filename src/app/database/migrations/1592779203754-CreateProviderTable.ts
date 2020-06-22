import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProviderTable1592779203754 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providers',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'amount_offer',
            type: 'integer',
            default: 0
          },
          {
            name: 'name_company',
            type: 'varchar'
          },
          {
            name: 'user_id',
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

    await queryRunner.createForeignKey('providers', new TableForeignKey(
      {
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL'
      }
    ))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users')
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1)

    await queryRunner.dropForeignKey('users', foreignKey)
    await queryRunner.dropTable('providers')
  }
}
