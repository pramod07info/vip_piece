import {
    Entity,
    Column,
    GeneratedUUidColumn,
  } from '@iaminfinity/express-cassandra';
  
  @Entity({
    table_name: 'usertoken',
    key: ['id','userId'],
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
  export class UserTokenEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'uuid',
    })
    userId: any;
  
    @Column({
      type: 'text',
    })
    tokenData: string;

    @Column({
        type: 'boolean',
    })
    isActive: boolean;
  }