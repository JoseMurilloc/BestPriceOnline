import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProviderIDTableUsers1594333887375 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'provider_id',
      type: 'integer',
      isNullable: true,
    }))

    await queryRunner.createForeignKey('users', new TableForeignKey({
      name: 'FK_user_provider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'providers',
      onDelete: 'SET NULL',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FK_user_provider')
    await queryRunner.dropColumn('users', 'provider_id')
  }

}
