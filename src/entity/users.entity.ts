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
    nick_name: string;
  
    @Column({
      type: 'text',
    })
    mobile: string;

    @Column({
        type: 'text',
      })
    email_id: string;

    @Column({
        type: 'text',
    })
    password: string;

    @Column({
        type: 'boolean',
    })
    is_active: boolean;

    @Column({
      type: 'text',
    })
    roles: Set<any>;
  }