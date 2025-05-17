import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("inventory")
export class Inventory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "integer" })
  quantity!: number;

  @Column({ type: "integer", name: "threshold_value" })
  thresholdValue!: number;

  @Column({ type: "numeric", name: "unit_price" })
  unitPrice!: number;

  @Column({ type: "date", nullable: true, name: "expiration_date" })
  expirationDate?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "last_received",
  })
  lastReceived?: Date;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "last_used",
  })
  lastUsed?: Date;

  @Column({ type: "boolean", default: true, name: "is_active" })
  isActive!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
