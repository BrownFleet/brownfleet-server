import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamp with time zone', name: 'start_date' })
  startDate!: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_date' })
  endDate!: Date;

  @Column({ type: 'text' })
  status!: string;

  @Column({ type: 'text', nullable: true, name: 'image_url' })
  imageUrl?: string;

  @Column({ type: 'text', nullable: true, name: 'video_url' })
  videoUrl?: string;

  @Column({ type: 'text', nullable: true, name: 'discount_type' })
  discountType?: string;

  @Column({ type: 'numeric', nullable: true, name: 'discount_value' })
  discountValue?: number;

  @Column({ type: 'text', nullable: true, name: 'combo_deal' })
  comboDeal?: string;

  @Column({ type: 'jsonb', nullable: true, name: 'menu_items' })
  menuItems?: object;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;
}