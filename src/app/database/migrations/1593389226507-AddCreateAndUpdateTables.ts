import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddCreateAndUpdateTables1593389226507 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('listProducts', new TableColumn({
      name: 'created_at',
      type: 'timestamp with time zone',
      default: 'now()'
    }))

    await queryRunner.addColumn('listProducts', new TableColumn({
      name: 'updated_at',
      type: 'timestamp with time zone',
      default: 'now()'
    }))


    await queryRunner.addColumn('providerEventPrices', new TableColumn({
      name: 'created_at',
      type: 'timestamp with time zone',
      default: 'now()'
    }))

    await queryRunner.addColumn('providerEventPrices', new TableColumn({
      name: 'updated_at',
      type: 'timestamp with time zone',
      default: 'now()'
    }))

    await queryRunner.addColumn('offers', new TableColumn({
      name: 'created_at',
      type: 'timestamp with time zone',
      default: 'now()'
    }))

    await queryRunner.addColumn('offers', new TableColumn({
      name: 'updated_at',
      type: 'timestamp with time zone',
      default: 'now()'
    }))
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('offers', 'updated_at')
    await queryRunner.dropColumn('offers', 'created_at')
    await queryRunner.dropColumn('providerEventPrices', 'updated_at')
    await queryRunner.dropColumn('providerEventPrices', 'created_at')
    await queryRunner.dropColumn('listProducts', 'updated_at')
    await queryRunner.dropColumn('listProducts', 'created_at')
  }

}
