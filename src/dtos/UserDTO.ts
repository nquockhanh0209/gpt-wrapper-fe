export class UserDTO {
  public id: string = "";
  public username: string = "";
  public email: string = "";
  public provider: string = "";
  public role: string = "";
//   public avatar: string = "";

  constructor(init?: Partial<UserDTO>) {
    Object.assign(this, init);
  }
}
