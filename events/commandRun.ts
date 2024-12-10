import { ClientEvent } from "DiscordMC/types/events";
import { Message } from "DiscordMC/classes/message";
import { ClientEventSignal } from "./clientEvent";

class CommandRunEventSignal extends ClientEventSignal {
    public readonly id = ClientEvent.Ready;

    public readonly command: string;

    public readonly args: string[]

    public readonly orginMessage: Message

    public constructor(command: string, args: string[], orginMessage: Message) {
        super();
        this.command = command
        this.args = args
        this.orginMessage = orginMessage
    }
}

export { CommandRunEventSignal };