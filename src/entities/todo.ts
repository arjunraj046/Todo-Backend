import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "varchar", length: 255 })
  title: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "boolean" })
  status: boolean = false;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();

  @UpdateDateColumn()
  userid: number = 0;
}
