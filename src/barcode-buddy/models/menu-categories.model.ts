import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Venue } from "./venue.model";
import { Menu } from "./menu.model";

@Entity("menu_categories")
export class MenuCategories {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Menu, { nullable: false })
  @JoinColumn({ name: "menu_id" })
  menu!: Menu;

  @ManyToOne(() => Venue, { nullable: false })
  @JoinColumn({ name: "venue_id" })
  venue!: Venue;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "integer", name: "display_order" })
  displayOrder?: number;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
