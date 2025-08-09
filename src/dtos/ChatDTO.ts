export class ChatDTO {
  public id: string = "";
  public question: string = "";
  public response: string = "";
  public model: string = "";

  constructor(init?: Partial<ChatDTO>) {
    Object.assign(this, init);
  }
}
