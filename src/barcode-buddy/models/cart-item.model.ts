import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'cart_id' })
  cartId!: string;

  @Column({ type: 'uuid', name: 'menu_item_id' })
  menuItemId!: string;

  @Column({ type: 'integer' })
  quantity!: number;

  @Column({ type: 'numeric' })
  price!: number;

  @Column({ type: 'numeric', name: 'total_price' })
  totalPrice!: number;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;
}