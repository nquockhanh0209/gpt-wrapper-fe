export class TeamDTO {
  public name: string = "";
  public description?: string = "";

  constructor(init?: Partial<TeamDTO>) {
    Object.assign(this, init);
  }
}
