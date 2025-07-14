import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Menu } from './menu.entity'; // Yeni import

@Entity('categories') // Veritabanındaki tablo adı
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'int', default: 0 })
    order_index: number;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ type: 'uuid', name: 'menu_id', nullable: false })
    menu_id: string;

    // İlişki: Bir kategori bir menüye aittir (ManyToOne)
    @ManyToOne(() => Menu, menu => menu.categories)
    @JoinColumn({ name: 'menu_id' })
    menu: Menu;

    // İlişki: Bir kategoriye birden fazla ürün ait olabilir (OneToMany)
    @OneToMany(() => Product, product => product.category)
    products: Product[];
}