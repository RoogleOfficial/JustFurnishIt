export interface LoginFormValues {
    email: string;
    password: string;
}
export interface DecodedToken {
    UserId: number;
    name: string;
    email: string;
    ProfilePicture: string;
    role: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface ForgotPasswordDetails {
    email: string;
}
export interface ResetPasswordValues {
    newPassword: string;
    confirmPassword: string;
}
export interface ResetPasswordDetails {
    email: string;
    token: string;
    newPassword: string;
}
export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    otp: string;
}
export interface UpdateProfilePayload {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    profilePictureUrl?: string;
    gender: string;
    dateOfBirth: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export interface ProfileFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    city: string;
    country: string;
    postalCode: string;
    state: string;
    streetAddress: string;
    gender: string;
    profilePictureUrl?: string;
}
export interface ProfilePhotoDTO {
    userID: number;
    profilePictureUrl: string;
}
export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    password: string;
    profilePictureUrl: string;
    role: string;
    gender: string;
    dateOfBirth: string;
    createdOn: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
