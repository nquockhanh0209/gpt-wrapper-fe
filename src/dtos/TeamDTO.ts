import { UserDTO } from "./UserDTO.ts";

export class TeamDTO {
  public id: string = "";
  public name: string = "";
  public description?: string = "";
  public leaderDTO: UserDTO = new UserDTO();
  public memberDTOs: UserDTO[] = [];

  constructor(init?: Partial<TeamDTO>) {
    Object.assign(this, init);
  }
}
