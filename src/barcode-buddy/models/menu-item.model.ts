import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("menu_items")
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "section_id" })
  sectionId!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "numeric" })
  price!: number;

  @Column({ type: "text", nullable: true, name: "image_url" })
  imageUrl?: string;

  @Column({ type: "boolean", name: "is_vegan", default: false })
  isVegan!: boolean;

  @Column({ type: "boolean", name: "is_gluten_free", default: false })
  isGlutenFree!: boolean;

  @Column({ type: "boolean", name: "is_spicy", default: false })
  isSpicy!: boolean;

  @Column({ type: "text", array: true, nullable: true })
  allergens?: string[];

  @Column({ type: "boolean", default: true })
  available!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;

  @Column({ type: "boolean", name: "is_discounted", default: false })
  isDiscounted!: boolean;

  @Column({ type: "numeric", nullable: true, name: "discount_price" })
  discountPrice?: number;
}
