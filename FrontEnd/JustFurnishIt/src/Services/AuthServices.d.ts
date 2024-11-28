import { ForgotPasswordDetails, LoginRequest, ResetPasswordDetails } from "../Types/AuthTypes";
export declare const registerUser: (userData: any) => Promise<any>;
export declare const loginUser: (credentials: LoginRequest) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const forgotPassword: (details: ForgotPasswordDetails) => Promise<any>;
export declare const resetPassword: (details: ResetPasswordDetails) => Promise<any>;
