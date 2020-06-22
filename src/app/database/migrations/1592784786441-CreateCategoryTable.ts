import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from 'typeorm'

export class CreateCategoryTable1592784786441 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
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

    await queryRunner.addColumn('products', new TableColumn({
      name: 'category_id',
      type: 'integer',
      isNullable: false
    }))

    await queryRunner.createForeignKey('products', new TableForeignKey(
      {
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL'
      }
    ))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('categories')
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1)

    await queryRunner.dropForeignKey('categories', foreignKey)

    await queryRunner.dropTable('categories')
  }
}
