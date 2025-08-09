import { ChatDTO } from "./ChatDTO";

export type ConversationDTO = {
  id: string
  name: string
  chatDTOs: ChatDTO[]
  initModel: string

}
