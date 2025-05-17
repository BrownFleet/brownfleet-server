import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  email!: string;

  @Column({ type: "text" })
  password!: string;

  @Column({ type: "text", name: "first_name" })
  firstName!: string;

  @Column({ type: "text", name: "last_name" })
  lastName!: string;

  @Column({ type: "text", nullable: true, name: "profile_picture" })
  profilePicture?: string;

  @Column({ type: "boolean", name: "is_deleted", default: false })
  isDeleted!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;

  @Column({ type: "integer", name: "role_id" })
  roleId!: number;
}
