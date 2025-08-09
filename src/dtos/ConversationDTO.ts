import { ChatDTO } from "./ChatDTO";

export class ConversationDTO {
  public id: string = "";
  public name: string = "";
  public chatDTOs: ChatDTO[] = [];
  public initModel: string = "";

  constructor(init?: Partial<ConversationDTO>) {
    Object.assign(this, init);
  }
}
