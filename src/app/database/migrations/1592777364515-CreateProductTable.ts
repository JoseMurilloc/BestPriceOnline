// eslint-disable-next-line no-unused-vars
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProductTable1592777364515 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'amount',
            type: 'integer',
            default: 0
          },
          {
            name: 'barcode',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'user_id',
            type: 'integer'
          }
        ]
      })
    )

    await queryRunner.createForeignKey('products', new TableForeignKey(
      {
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      }
    ))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users')
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1)

    await queryRunner.dropForeignKey('users', foreignKey)
    await queryRunner.dropTable('products')
  }
}
