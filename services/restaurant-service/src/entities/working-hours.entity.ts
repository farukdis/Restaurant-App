// services/restaurant-service/src/entities/working-hours.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm'; // **YENİ: Unique import edildi**
import { Restaurant } from './restaurant.entity';

@Entity('working_hours') // Veritabanındaki tablo adı
@Unique(['restaurant_id', 'day_of_week']) // **YENİ: restaurant_id ve day_of_week çifti UNIQUE olacak**
export class WorkingHours {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'restaurant_id', nullable: false })
    restaurant_id: string;

    @Column({ type: 'int', nullable: false })
    day_of_week: number; // 0 (Pazar) - 6 (Cumartesi)

    @Column({ type: 'time without time zone', nullable: false })
    open_time: string; // "HH:MM:SS" formatında

    @Column({ type: 'time without time zone', nullable: false })
    close_time: string; // "HH:MM:SS" formatında

    @Column({ type: 'boolean', default: false })
    is_closed: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir çalışma saati kaydı bir restorana aittir (ManyToOne)
    @ManyToOne(() => Restaurant, restaurant => restaurant.workingHours, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' }) // restaurant_id sütunu üzerinden ilişkilendir
    restaurant: Restaurant;
}