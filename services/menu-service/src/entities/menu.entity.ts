import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';

@Entity('menus') // Veritabanındaki tablo adı
export class Menu {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string; // Menü adı, örn: "Öğle Menüsü", "Akşam Menüsü"

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'uuid', name: 'restaurant_id', nullable: false })
    restaurant_id: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir menü birden fazla kategoriye sahiptir (OneToMany)
    @OneToMany(() => Category, category => category.menu)
    categories: Category[];
}