import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("venue_washrooms")
export class VenueWashroom {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "venue_id" })
  venueId!: string;

  @Column({ type: "text", name: "navigational_direction" })
  navigationalDirection!: string;

  @Column({ type: "jsonb" })
  location!: object;

  @Column({ type: "text" })
  status!: string;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
