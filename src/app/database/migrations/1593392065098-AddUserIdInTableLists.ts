import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdInTableLists1593392065098 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('lists', new TableColumn({
      name: 'user_id',
      type: 'integer'
    }))


    await queryRunner.createForeignKey('lists', new TableForeignKey(
      {
        name: 'FK_list_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL'
      }
    ))
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lists', 'FK_list_user')
    await queryRunner.dropTable('lists')  
  }

}
