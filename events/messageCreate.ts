import { ClientEvent } from "DiscordMC/types/events";
import { ClientEventSignal } from "./clientEvent";
import { Message } from "DiscordMC/classes/message";

class MessageCreateEventSignal extends ClientEventSignal {
    public readonly id = ClientEvent.MessageCreate;

    public readonly message: Message;

    public constructor(message: Message) {
        super();
        this.message = message;
    }
}

export { MessageCreateEventSignal };