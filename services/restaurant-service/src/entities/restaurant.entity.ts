// services/restaurant-service/src/entities/restaurant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { WorkingHours } from './working-hours.entity';
import { DeliveryZone } from './delivery-zone.entity';

@Entity('restaurants') // Veritabanındaki tablo adı
export class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phone_number: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    logo_url: string;

    @Column({ type: 'varchar', length: 50, default: 'OPEN' })
    status: string; // 'OPEN', 'CLOSED', 'MAINTENANCE'

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
    min_order_amount: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
    default_delivery_fee: number;

    @Column({ type: 'varchar', length: 10, default: 'TRY' })
    currency: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişkiler (ileride oluşturulacak entity'ler için şimdilik yer tutucu)
    @OneToMany(() => WorkingHours, workingHours => workingHours.restaurant)
    workingHours: WorkingHours[];

    @OneToMany(() => DeliveryZone, deliveryZone => deliveryZone.restaurant)
    deliveryZones: DeliveryZone[];
}