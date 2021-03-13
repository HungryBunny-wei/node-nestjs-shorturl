import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShortUrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string; // 长链接地址

  @Column()
  urlCode: string; // 缩短后的地址

}
