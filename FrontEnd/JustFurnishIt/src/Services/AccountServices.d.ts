import { ProfilePhotoDTO, UpdateProfilePayload, User } from '../Types/AuthTypes';
export declare const getUserById: (id: number) => Promise<User | null>;
export declare const updateUserProfile: (userId: number, payload: UpdateProfilePayload) => Promise<any>;
export declare const uploadImage: (file: File) => Promise<string | null>;
export declare const updateProfilePhoto: (id: Number, profilePhotoDto: ProfilePhotoDTO) => Promise<User>;
