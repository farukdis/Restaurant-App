// services/auth-service/src/auth/dto/registered-user.dto.ts
import { User } from '../../entities/user.entity';

export class RegisteredUserDto {
    user_id: string;
    email: string;
    full_name: string;
    phone_number: string;
    profile_picture_url: string;
    is_active: boolean;
    last_login_at: Date | null;
    created_at: Date; // **DEĞİŞTİ: createdAt yerine created_at**
    updated_at: Date; // **DEĞİŞTİ: updatedAt yerine updated_at**

    constructor(user: User) {
        this.user_id = user.id;
        this.email = user.email;
        this.full_name = user.full_name;
        this.phone_number = user.phone_number;
        this.profile_picture_url = user.profile_picture_url;
        this.is_active = user.is_active;
        this.last_login_at = user.last_login_at;
        this.created_at = user.created_at; // **Düzeltildi**
        this.updated_at = user.updated_at; // **Düzeltildi**
    }
}