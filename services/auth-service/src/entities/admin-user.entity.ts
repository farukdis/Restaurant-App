// services/auth-service/src/entities/admin-user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity'; // Role entity'sini import ediyoruz

@Entity('admin_users') // Veritabanındaki tablo adı 'admin_users' (yönetim paneli kullanıcıları)
export class AdminUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string; // Veritabanında password_hash olarak tutulacak

    @Column()
    full_name: string;

    @Column({ nullable: true }) // Opsiyonel telefon numarası
    phone_number: string;

    @Column({ default: true }) // Kullanıcı hesabı aktif mi? Varsayılan TRUE
    is_active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Role tablosu ile ilişki
    @ManyToOne(() => Role, role => role.id, { eager: true }) // eager: true ile AdminUser çekildiğinde rol bilgisi de otomatik çekilir
    @JoinColumn({ name: 'role_id' }) // role_id sütununu foreign key olarak kullan
    role: Role; // Role objesinin kendisi

    @Column({ type: 'uuid' }) // role_id sütunu, doğrudan UUID olarak tutulur
    role_id: string; // Foreign key'in kendisi
}