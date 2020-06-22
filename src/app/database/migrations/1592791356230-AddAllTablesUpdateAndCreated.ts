import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddAllTablesUpdateAndCreated1592791356230 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }))

    await queryRunner.addColumn('products', new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()'
    }))

    await queryRunner.addColumn('categories', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }))

    await queryRunner.addColumn('categories', new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()'
    }))

    await queryRunner.addColumn('users', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }))

    await queryRunner.addColumn('users', new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()'
    }))

    await queryRunner.addColumn('providers', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }))

    await queryRunner.addColumn('providers', new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'created_at')
    await queryRunner.dropColumn('products', 'updated_at')

    await queryRunner.dropColumn('categories', 'created_at')
    await queryRunner.dropColumn('categories', 'updated_at')

    await queryRunner.dropColumn('users', 'created_at')
    await queryRunner.dropColumn('users', 'updated_at')

    await queryRunner.dropColumn('providers', 'created_at')
    await queryRunner.dropColumn('providers', 'updated_at')
  }
}
