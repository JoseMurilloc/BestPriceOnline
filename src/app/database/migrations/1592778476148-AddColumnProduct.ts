import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnProduct1592778476148 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'brand',
      type: 'varchar'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'brand')
  }
}
