import { LoginResponse } from "../../models/loginReponse";

export interface loginRepo {
    login: (username: string, password: string) => Promise<LoginResponse>;
    }


