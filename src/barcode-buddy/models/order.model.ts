import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "numeric", name: "total_price" })
  totalPrice!: number;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;

  @Column({ type: "integer", name: "order_status_id" })
  orderStatusId!: number;

  @Column({ type: "uuid", name: "venue_id" })
  venueId!: string;

  @Column({ type: "text", name: "table_number" })
  tableNumber!: string;
}
