import {
    Entity,
    Column,
    GeneratedUUidColumn,
  } from '@iaminfinity/express-cassandra';
  
  @Entity({
    table_name: 'videoinfo',
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
  export class VideoInfoEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'uuid',
    })
    piece_id: any;
  
    @Column({
      type: 'text',
    })
    video_url: string;
  
    @Column({
      type: 'text',
    })
    sentences:any  }