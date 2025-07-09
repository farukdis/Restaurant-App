// services/auth-service/src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'; // **DEĞİŞTİ: OneToMany import edildi**
import { PasswordResetToken } from './password-reset-token.entity'; // **YENİ: PasswordResetToken import edildi**

@Entity('users') // PostgreSQL'de tablo adını belirtir
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
    phone_number: string;

    @Column({ select: false }) // Şifrenin doğrudan entity'den çekilmesini engelle
    password: string;

    @Column()
    full_name: string;

    @Column({ nullable: true })
    profile_picture_url: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ default: true })
    is_active: boolean;

    @Column({ type: 'timestamp with time zone', nullable: true })
    last_login_at: Date;

    // Yeni: Bir kullanıcının birden fazla şifre sıfırlama tokenı olabilir
    @OneToMany(() => PasswordResetToken, passwordResetToken => passwordResetToken.user)
    passwordResetTokens: PasswordResetToken[];
}