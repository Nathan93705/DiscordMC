import { ClientEvent } from "DiscordMC/types/events";
import { Client } from "../client";
import { ClientEventSignal } from "./clientEvent";

class ClientReadyEventSignal extends ClientEventSignal {
    public readonly id = ClientEvent.Ready;

    public readonly token: string;

    public readonly client: Client;

    public constructor(client: Client, token: string) {
        super();
        this.client = client;
        this.token = token;
    }
}

export { ClientReadyEventSignal };