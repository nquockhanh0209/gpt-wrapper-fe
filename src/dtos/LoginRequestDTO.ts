import { LoginType } from "./enums/LoginType";

export class LoginRequestDTO {
  loginType: LoginType;
  email?: string;
  password?: string;
  idToken?: string;
}
