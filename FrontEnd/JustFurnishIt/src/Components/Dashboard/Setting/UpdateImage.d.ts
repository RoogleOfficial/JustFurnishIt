interface User {
    userId: number;
    firstName: string;
    profilePictureUrl?: string;
}
interface ChangeProfilePictureProps {
    userProps: User;
}
declare const ChangeProfilePicture: React.FC<ChangeProfilePictureProps>;
export default ChangeProfilePicture;
