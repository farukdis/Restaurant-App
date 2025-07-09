// services/auth-service/src/auth/dto/user-profile.dto.ts
import { User } from '../../entities/user.entity';

export class UserProfileDto {
    user_id: string;
    email: string;
    full_name: string;
    phone_number: string;
    profile_picture_url: string;
    is_active: boolean;

    constructor(user: User) {
        this.user_id = user.id;
        this.email = user.email;
        this.full_name = user.full_name;
        this.phone_number = user.phone_number;
        this.profile_picture_url = user.profile_picture_url;
        this.is_active = user.is_active;
    }
}