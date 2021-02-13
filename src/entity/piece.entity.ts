import {
    Entity,
    Column,
    GeneratedUUidColumn,
  } from '@iaminfinity/express-cassandra';
  
  @Entity({
    table_name: 'piece',
    key: ['id'],
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
    title: string;
  
    @Column({
      type: 'int',
    })
    categoryId: number;
  
    @Column({
      type: 'text',
    })
    status: string;
  }