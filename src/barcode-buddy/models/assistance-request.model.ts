import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('assistance_requests')
export class AssistanceRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'venue_table_id' })
  venueTableId!: string;

  @Column({ type: 'integer', name: 'request_type_id' })
  requestTypeId!: number;

  @Column({ type: 'text' })
  status!: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: object;
}