import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnProductUnity1592782489972 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'unity',
      type: 'varchar',
      isNullable: false
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'unity')
  }
}
