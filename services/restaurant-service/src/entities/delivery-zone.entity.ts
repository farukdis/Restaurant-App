// services/restaurant-service/src/entities/delivery-zone.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('delivery_zones') // Veritabanındaki tablo adı
export class DeliveryZone {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'restaurant_id', nullable: false })
    restaurant_id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    zone_name: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
    min_order_amount: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
    delivery_fee: number;

    @Column({ type: 'jsonb', nullable: true }) // GEOJSON formatında koordinatlar için
    polygon_coordinates: object; // JSONB tipi için TypeScript'te 'object' veya daha spesifik bir interface kullanılabilir

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir teslimat bölgesi bir restorana aittir (ManyToOne)
    @ManyToOne(() => Restaurant, restaurant => restaurant.deliveryZones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' }) // restaurant_id sütunu üzerinden ilişkilendir
    restaurant: Restaurant;
}