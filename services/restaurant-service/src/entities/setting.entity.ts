// services/restaurant-service/src/entities/setting.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('settings') // Veritabanındaki tablo adı
export class Setting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true }) // Ayar anahtarı benzersiz olmalı
    key_name: string;

    @Column({ type: 'text', nullable: true }) // Ayar değeri TEXT olarak saklanacak
    key_value: string;

    @Column({ type: 'boolean', default: false }) // Hassas bilgi mi (şifreli saklama gerektirir)?
    is_sensitive: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}