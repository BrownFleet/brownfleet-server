import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'text' })
  city!: string;

  @Column({ type: 'text' })
  state!: string;

  @Column({ type: 'text', name: 'postal_code' })
  postalCode!: string;

  @Column({ type: 'text' })
  country!: string;

  @Column({ type: 'text', name: 'phone_number' })
  phoneNumber!: string;

  @Column({ type: 'text', nullable: true, name: 'website_url' })
  websiteUrl?: string;

  @Column({ type: 'integer', name: 'total_tables' })
  totalTables!: number;

  @Column({ type: 'integer' })
  capacity!: number;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'under construction'],
    default: 'active'
  })
  status!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true, name: 'logo_url' })
  logoUrl?: string;

  @Column({ type: 'jsonb', name: 'business_hours' })
  businessHours!: object;

  @Column({ type: 'boolean', name: 'is_deleted', default: false })
  isDeleted!: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'text', name: 'welcome_message', nullable: true })
  welcomeMessage?: string;

  @Column({ type: 'text', nullable: true })
  usp?: string;

  @Column({ type: 'text', array: true })
  specialties!: string[];

  @Column({ type: 'integer', name: 'venue_type_id' })
  venueTypeId!: number;
}