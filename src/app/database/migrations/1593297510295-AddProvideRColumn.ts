import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddProvideRColumn1593297510295 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'provider',
      type: 'boolean'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'provider')
  }
}
