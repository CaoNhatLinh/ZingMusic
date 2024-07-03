import { LoginResponse } from "../../models/loginReponse";
import { loginRepo } from "./loginrepo";

export class LoginRepoImpl implements loginRepo {
  async login(email: string, password: string): Promise<LoginResponse> {
    throw new Error("Method not implemented.");
    }
}