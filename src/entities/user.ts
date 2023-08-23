import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "varchar", unique: true })
  username: string = "";

  @Column({ type: "varchar", unique: true })
  email: string = "";

  @Column({ type: "varchar"})
  password: string = "";

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
