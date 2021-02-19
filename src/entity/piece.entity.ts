import {
    Entity,
    Column,
    GeneratedUUidColumn,
    AfterSave,
  } from '@iaminfinity/express-cassandra';
  
  @Entity({
    table_name: 'piece',
    key: ['id','user_id'],
    options: {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      // versions: {
      //   key: '__v1',
      // },
    },
  })
  export class PieceEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'text',
    })
    user_id: string;

    @Column({
      type: 'text',
    })
    title: string;
  
    @Column({
      type: 'int',
    })
    category_id: number;
  
    @Column({
      type: 'text',
    })
    status: string;

    @Column({
      type: 'text',
    })
    source_piece: any;

    @AfterSave()
    afterSave(instance: this, options: any) {}
  }