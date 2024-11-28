interface AuthState {
    token: string | null;
    userDetails: {
        name: string;
        email: string;
        role: string;
        ProfilePicture?: string;
        UserId?: number;
    } | null;
    designerDetails: {
        designerId?: number;
        isApproved?: number;
    } | null;
}
export declare const setCredentials: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    token: string;
    userDetails: AuthState["userDetails"];
}, "auth/setCredentials">, clearCredentials: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearCredentials">, setDesignerDetails: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    designerId: number;
    isApproved: number;
}, "auth/setDesignerDetails">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
