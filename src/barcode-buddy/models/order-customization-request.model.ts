import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('order_customization_requests')
export class OrderCustomizationRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'order_id' })
  orderId!: string;

  @Column({ type: 'uuid', name: 'venue_id' })
  venueId!: string;

  @Column({ type: 'jsonb', name: 'request_details' })
  requestDetails!: object;

  @Column({ type: 'text' })
  status!: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @Column({ type: 'timestamp with time zone', nullable: true, name: 'responded_at' })
  respondedAt?: Date;
}