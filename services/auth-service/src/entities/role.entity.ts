// services/auth-service/src/entities/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('roles') // Veritabanındaki tablo adı 'roles' olacak
export class Role {
    @PrimaryGeneratedColumn('uuid') // UUID formatında benzersiz ID
    id: string;

    @Column({ unique: true, length: 50 }) // Rol adı (örn: 'RESTAURANT_OWNER', 'CUSTOMER') benzersiz ve 50 karakterle sınırlı
    name: string;

    @Column({ type: 'text', nullable: true }) // Rolün açıklaması, metin formatında ve isteğe bağlı
    description: string;

    @CreateDateColumn() // Rolün oluşturulma zamanı
    createdAt: Date;

    @UpdateDateColumn() // Rolün güncellenme zamanı
    updatedAt: Date;
}