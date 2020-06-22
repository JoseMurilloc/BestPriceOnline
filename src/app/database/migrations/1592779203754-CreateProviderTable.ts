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
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'amount_offer',
            type: 'integer',
            default: 0
          },
          {
            name: 'user_id',
            type: 'integer'
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
