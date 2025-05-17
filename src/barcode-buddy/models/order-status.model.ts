import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_status")
export class OrderStatus {
  @PrimaryGeneratedColumn("increment", { name: "status_id" })
  statusId!: number;

  @Column({ type: "varchar", length: 50, name: "status_name", nullable: false })
  statusName!: string;
}
