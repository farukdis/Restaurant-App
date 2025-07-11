import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PasswordResetToken } from './password-reset-token.entity';
import { Address } from './address.entity'; // YENİ: Address entity'sini import et

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
    phone_number: string;

    @Column({ select: false })
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

    @OneToMany(() => PasswordResetToken, passwordResetToken => passwordResetToken.user)
    passwordResetTokens: PasswordResetToken[];

    // YENİ: Bir kullanıcının birden fazla adresi olabilir
    @OneToMany(() => Address, address => address.user)
    addresses: Address[];
}