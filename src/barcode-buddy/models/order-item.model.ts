import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "order_id" })
  orderId!: string;

  @Column({ type: "uuid", name: "menu_item_id" })
  menuItemId!: string;

  @Column({ type: "integer" })
  quantity!: number;

  @Column({ type: "numeric" })
  price!: number;

  @Column({ type: "numeric", name: "total_price" })
  totalPrice!: number;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
