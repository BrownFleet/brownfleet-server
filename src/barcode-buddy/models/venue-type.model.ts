import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('venue_types')
export class VenueType {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text' })
  name!: string;
}