import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("venue_daily_analytics")
export class VenueDailyAnalytic {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", name: "venue_id" })
  venueId!: string;

  @Column({ type: "date" })
  date!: string;

  @Column({ type: "integer", name: "total_orders" })
  totalOrders!: number;

  @Column({ type: "integer", name: "orders_in_progress" })
  ordersInProgress!: number;

  @Column({ type: "integer", name: "cancelled_orders" })
  cancelledOrders!: number;

  @Column({ type: "numeric", name: "total_revenue" })
  totalRevenue!: number;

  @Column({ type: "numeric", name: "average_order_value" })
  averageOrderValue!: number;

  @Column({ type: "integer", name: "customer_count" })
  customerCount!: number;

  @Column({ type: "integer", name: "inventory_low_stock_count" })
  inventoryLowStockCount!: number;

  @Column({ type: "integer", name: "employees_active_count" })
  employeesActiveCount!: number;

  @Column({ type: "integer", name: "tables_filled" })
  tablesFilled!: number;

  @Column({ type: "integer", name: "tables_empty" })
  tablesEmpty!: number;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;
}
