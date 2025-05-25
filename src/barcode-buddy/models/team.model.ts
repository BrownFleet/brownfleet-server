import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "user_id" })
  userId!: string;

  @Column({ type: "text", name: "team_name" })
  teamName?: string;

  @Column({ type: "text", name: "name" })
  name!: string;

  @Column({ type: "text", nullable: true })
  email?: string;

  @Column({ type: "text", nullable: true })
  phone?: string;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ type: "integer", name: "working_hours" })
  workingHours!: number;

  @Column({ type: "timestamp with time zone", name: "start_date" })
  startDate!: Date;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "end_date",
  })
  endDate?: Date;

  @Column({ type: "boolean", default: true, name: "is_active" })
  isActive!: boolean;

  @Column({ type: "text", name: "payment_type" })
  paymentType!: string;

  @Column({ type: "numeric", name: "salary_or_rate" })
  salaryOrRate!: number;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;

  @Column({ type: "integer", name: "role_id" })
  roleId!: number;

  @Column({ type: "uuid", name: "venue_id" })
  venueId!: string;

  @Column({ type: "text", nullable: true })
  image?: string;

  @Column({ type: "text", nullable: true })
  lastActive?: string;

  @Column({ type: "boolean", name: "is_available", default: true })
  isAvailable!: boolean;
}
