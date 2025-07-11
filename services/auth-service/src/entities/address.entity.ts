import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    address_line1: string;

    @Column({ length: 255, nullable: true })
    address_line2: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100 })
    district: string;

    @Column({ length: 20 })
    postal_code: string;

    @Column({ length: 100 })
    address_title: string;

    @Column('decimal', { precision: 10, scale: 7, nullable: true })
    latitude: number;

    @Column('decimal', { precision: 10, scale: 7, nullable: true })
    longitude: number;

    @Column({ default: false })
    is_default: boolean;

    @ManyToOne(() => User, user => user.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}