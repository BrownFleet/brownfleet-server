import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("increment", { name: "role_id" })
  roleId!: number;

  @Column({ type: "varchar", length: 50, name: "role_name", nullable: false })
  roleName!: string;
}
