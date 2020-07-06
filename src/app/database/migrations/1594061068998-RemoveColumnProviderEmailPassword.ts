import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class RemoveColumnProviderEmailPassword1594061068998 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('providers', [
        new TableColumn({
            name: 'email',
            type: 'varchar'
        }),
        new TableColumn({
            name: 'password',
            type: 'varchar'
        }),
        new TableColumn({
            name: 'name',
            type: 'varchar'
        })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('providers', [
        new TableColumn({
          name: 'email',
          type: 'varchar'
        }),
        new TableColumn({
          name: 'password',
          type: 'varchar'
        }),
        new TableColumn({
          name: 'name',
          type: 'varchar'
        })
    ])
  }

}
