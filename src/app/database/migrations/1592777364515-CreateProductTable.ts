// eslint-disable-next-line no-unused-vars
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProductTable1592777364515 implements MigrationInterface {
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
            name: 'barcode',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'user_id',
            type: 'integer'
          },
          {
            name: 'category_id',
            type: 'integer'
          },
          {
            name: 'brand',
            type: 'varchar'
          },
          {
            name: 'unity',
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

    await queryRunner.createForeignKey('products', new TableForeignKey(
      {
        name: 'FK_product_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL'
      }
    ))

    await queryRunner.createForeignKey('products', new TableForeignKey(
      {
        name: 'FK_product_category',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL'
      }
    ))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FK_product_category')
    await queryRunner.dropForeignKey('users', 'FK_product_user')
    await queryRunner.dropTable('products')
    await queryRunner.dropTable('category')
  }
}
