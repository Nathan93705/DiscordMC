import { ClientEvent } from "DiscordMC/types/events";
import { CommandRunEventSignal } from "DiscordMC/events/commandRun";
import { MessageCreateEventSignal } from "DiscordMC/events/messageCreate";
import { ClientReadyEventSignal } from "DiscordMC/events/ready";


interface ClientEvents {
    [ClientEvent.Ready]: ClientReadyEventSignal;
    [ClientEvent.CommandRun]: CommandRunEventSignal;
    [ClientEvent.MessageCreate]: MessageCreateEventSignal;
}

export { ClientEvents };