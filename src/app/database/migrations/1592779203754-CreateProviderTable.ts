import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProviderTable1592779203754 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providers',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'integer'
          },
          {
            name: 'amount_offer',
            type: 'integer',
            default: 0
          },
          {
            name: 'company',
            type: 'varchar'
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

    await queryRunner.createForeignKey('providers', new TableForeignKey(
      {
        name: 'FK_provider_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL'
      }
    ))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FK_provider_user')
    await queryRunner.dropTable('providers')
  }
}
