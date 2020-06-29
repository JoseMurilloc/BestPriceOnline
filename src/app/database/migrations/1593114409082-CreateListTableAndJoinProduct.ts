import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'
import { query } from 'express'

export class CreateListTableAndJoinProduct1593114409082 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lists',
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

    await queryRunner.createTable(
      new Table({
        name: 'listProducts',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'list_id',
            type: 'integer'
          },
          {
            name: 'product_id',
            type: 'integer'
          },
          {
            name: 'amount',
            type: 'integer',
            isNullable: false
          }
        ]
      })
    )

    await queryRunner.createForeignKey('listProducts', new TableForeignKey({
      name: 'FK_listProduct_list',
      columnNames: ['list_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'lists',
      onDelete: 'SET NULL'
    }))

    await queryRunner.createForeignKey('listProducts', new TableForeignKey({
      name: 'FK_listProduct_product',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'SET NULL'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey('listProcucts', 'FK_listProduct_product')
    queryRunner.dropForeignKey('listProcucts', 'FK_listProduct_list')
    queryRunner.dropTable('listProcucts')
    queryRunner.dropTable('lists')
  }
}
