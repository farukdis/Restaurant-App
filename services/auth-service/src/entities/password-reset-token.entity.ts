// services/auth-service/src/entities/password-reset-token.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity'; // User entity'sini import et

@Entity('password_reset_tokens')
export class PasswordResetToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id' }) // user_id sütunu UUID tipinde
    user_id: string;

    @Column({ unique: true }) // Token'ın benzersiz olmasını sağlıyoruz
    token: string;

    @Column({ type: 'timestamp with time zone' }) // Token'ın son kullanma tarihi
    expires_at: Date;

    @Column({ default: false }) // Token kullanıldı mı?
    used: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    // İlişki: Bir şifre sıfırlama tokenı bir kullanıcıya aittir (ManyToOne)
    @ManyToOne(() => User, user => user.passwordResetTokens, { onDelete: 'CASCADE' }) // Kullanıcı silindiğinde token'ları da sil
    @JoinColumn({ name: 'user_id' }) // user_id sütunu üzerinden ilişkilendir
    user: User;
}