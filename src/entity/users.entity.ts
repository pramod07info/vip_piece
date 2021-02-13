import {
    Entity,
    Column,
    GeneratedUUidColumn,
  } from '@iaminfinity/express-cassandra';
  
  @Entity({
    table_name: 'users',
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
  export class UsersEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'text',
    })
    name: string;
  
    @Column({
      type: 'text',
    })
    nickName: string;
  
    @Column({
      type: 'text',
    })
    mobile: string;

    @Column({
        type: 'text',
      })
    emailId: string;

    @Column({
        type: 'text',
    })
    password: string;

    @Column({
        type: 'boolean',
    })
    isActive: boolean;
  }