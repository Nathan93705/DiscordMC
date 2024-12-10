import { ClientEvent } from "DiscordMC/types/events";
import { ClientReadyEventSignal } from "./ready";
import { CommandRunEventSignal } from "./commandRun";
import { MessageCreateEventSignal } from "./messageCreate";


interface ClientEvents {
    [ClientEvent.Ready]: ClientReadyEventSignal;
    [ClientEvent.CommandRun]: CommandRunEventSignal;
    [ClientEvent.MessageCreate]: MessageCreateEventSignal;
}

export { ClientEvents };