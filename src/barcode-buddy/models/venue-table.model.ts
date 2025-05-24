import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("venue_tables")
export class VenueTable {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "venue_id" })
  venueId!: string;

  @Column({ type: "text", name: "table_number" })
  tableNumber!: string;

  @Column({ type: "text", name: "qr_code" })
  qrCode!: string;

  @Column({ type: "text" })
  status!: string;

  @Column({ type: "integer", default: 0 })
  capacity!: number;

  @Column({ type: "integer", default: 0 })
  orders!: number;

  @Column({ type: "text", nullable: true })
  time?: string;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;

  @Column({ type: "text", name: "table_name" })
  tableName!: string;
}
