// services/order-service/src/entities/order-status-log.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Order } from './order.entity'; // Order entity'sini hala buradan import ediyor
import { OrderStatus } from '../enums/order-status.enum'; // <-- BURAYI GÜNCELLEDİK! Artık enum'ı yeni yerden import ediyor

@Entity('order_status_logs')
export class OrderStatusLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.status_logs)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ type: 'uuid' })
    order_id: string;

    @Column({
        type: 'enum',
        enum: Object.values(OrderStatus), // BU SATIRDAKİ Object.values(OrderStatus) KALACAK!
        enumName: 'order_status_enum',
        nullable: false,
    })
    status: OrderStatus;

    @Column({ type: 'uuid', nullable: true })
    changed_by_user_id: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}