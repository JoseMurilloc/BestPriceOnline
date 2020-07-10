import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdInTableUser1594332274864 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'user_id',
      type: 'integer',
      comment: 'Id in user creator provider ',
      isNullable: true,
    }))

    await queryRunner.createForeignKey('users', new TableForeignKey({
      name: 'FK_user_user',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
    }))

    await queryRunner.dropColumn('providers', 'user_id')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('providers', new TableColumn({
      name: 'user_id',
      type: 'integer'
    }))

    await queryRunner.createForeignKey('providers', new TableForeignKey({
      name: 'FK_provider_user',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL'
    }))
    await queryRunner.dropForeignKey('users', 'FK_user_user')
    await queryRunner.dropColumn('users', 'user_id')
  }

}
