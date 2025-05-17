import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("surveillance")
export class Surveillance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", name: "camera_name" })
  cameraName!: string;

  @Column({ type: "text", name: "camera_type" })
  cameraType!: string;

  @Column({ type: "text", name: "camera_location" })
  cameraLocation!: string;

  @Column({ type: "boolean", name: "camera_status" })
  cameraStatus!: boolean;

  @Column({ type: "text", nullable: true, name: "camera_url" })
  cameraUrl?: string;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
