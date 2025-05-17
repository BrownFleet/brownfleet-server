import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'order_id' })
  orderId!: string;

  @Column({ type: 'numeric' })
  amount!: number;

  @Column({ type: 'text', name: 'payment_method' })
  paymentMethod!: string;

  @Column({ type: 'text', name: 'payment_status' })
  paymentStatus!: string;

  @Column({ type: 'text', nullable: true, name: 'transaction_id' })
  transactionId?: string;

  @Column({ type: 'timestamp with time zone', name: 'payment_date' })
  paymentDate!: Date;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;
}