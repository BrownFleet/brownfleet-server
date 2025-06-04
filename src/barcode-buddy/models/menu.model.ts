import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("menus")
export class Menu {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "venue_id" })
  venueId!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "uuid", name: "category_id" })
  categoryId!: string;

  @Column({ type: "text", array: true, default: "{}" })
  tags!: string[];

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "jsonb", nullable: true })
  variants!: any[];

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "text" })
  currency!: string;

  @Column({ type: "text", nullable: true })
  image!: string;

  @Column({ type: "boolean", default: false })
  popular!: boolean;

  @Column({ type: "boolean", default: true, name: "is_available" })
  isAvailable!: boolean;

  @Column({ type: "text", nullable: true })
  preparationTime!: string;

  @Column({ type: "text", array: true, default: "{}" })
  ingredients!: string[];

  @Column({ type: "text", array: true, default: "{}" })
  allergens!: string[];

  @Column({ type: "integer", nullable: true })
  calories!: number;

  @Column({ type: "float", default: 0 })
  discount!: number;

  @Column({ type: "jsonb", nullable: true })
  dietary!: {
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
  };

  @Column({ type: "float", nullable: true })
  rating!: number;

  @Column({ type: "integer", nullable: true })
  reviewsCount!: number;

  @Column({ type: "jsonb", nullable: true })
  comboDetails!: any; // or define a ComboDetails type/interface

  @Column({ type: "text", nullable: true })
  internalNotes!: string;

  @Column({ type: "text", default: "draft" })
  status!: string;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
