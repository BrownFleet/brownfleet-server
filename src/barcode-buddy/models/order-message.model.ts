import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("order_messages")
export class OrderMessage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "order_id" })
  orderId!: string;

  @Column({ type: "text" })
  sender!: string;

  @Column({ type: "text" })
  message!: string;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;
}
