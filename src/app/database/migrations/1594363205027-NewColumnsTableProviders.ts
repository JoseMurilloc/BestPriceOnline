import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class NewColumnsTableProviders1594363205027 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropColumn('providers', 'amount_offer')

    await queryRunner.addColumns('providers', [
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'url_image',
        type: 'varchar',
        isNullable: true,

      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('providers', [
      new TableColumn({
        name: 'url_image',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'address',
        type: 'varchar',
      }),
    ])


    await queryRunner.addColumn('providers', new TableColumn({
      name: 'amount_off',
      type: 'integer'
    }))
  }

}
