import { RegisterRequest, SignRequest, UserEntity } from "../../shared/src/types";

export interface AuthState {
    accessToken: string | null;
    user: UserEntity | null;
    loading: boolean;

    setAccessToken: (accessToken: string) => void;
    clearState: () => void;

    signUp: (user: RegisterRequest) => Promise<void>;
    signIn: (user: SignRequest) => Promise<void>;
    signOut: () => Promise<void>;
    fetchMe: () => Promise<void>;
    refresh: () => Promise<void>;
}