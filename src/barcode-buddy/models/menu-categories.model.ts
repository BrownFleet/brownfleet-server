import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("menu_categories")
export class MenuSection {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "menu_id" })
  menuId!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "integer", name: "display_order" })
  displayOrder!: number;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
