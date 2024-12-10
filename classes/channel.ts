import { HttpRequestMethod } from "@minecraft/server-net";
import { Client } from "../client";
import { MessageManager } from "../managers/messages";
import { Message } from "./message";
import { MessagePayload } from "DiscordMC/types/message";
import { RawChannel, RawMessage } from "DiscordMC/types/raw";
import { Routes } from "DiscordMC/types/routes";

export class BaseChannel {
    protected client: Client;
    public id: string;

    public type: number
    public last_message_id?: string
    public flags: number
    public guild_id: string
    public name: string
    public parent_id?: string
    public rate_limit_per_user: number
    public topic?: any
    public permission_overwrites: any[]
    public nsfw: boolean

    // TODO
    public constructor(client: Client, data: RawChannel) {
        this.client = client;
        this.id = data.id
        this.type = data.type
        this.last_message_id = data.last_message_id
        this.flags = data.flags
        this.guild_id = data.guild_id
        this.name = data.name
        this.parent_id = data.parent_id
        this.rate_limit_per_user = data.rate_limit_per_user
        this.topic = data.topic
        this.permission_overwrites = data.permission_overwrites
        this.nsfw = data.nsfw
    }

    public isTextBased(): this is TextChannel {
        return this instanceof TextChannel;
    }

    public delete(): void {
        this.client.sendRequest(`${Routes.Channels}/${this.id}`, HttpRequestMethod.Delete);
    }

}


export class TextChannel extends BaseChannel {
    protected messages: MessageManager;

    public constructor(client: Client, data?: RawChannel) {
        super(client, data);
        this.messages = new MessageManager(client, this);
    }

    public async send(message: string | MessagePayload): Promise<Message> {
        const payload = (typeof message == "string") ? { content: message } as MessagePayload : message
        const response = await this.client.sendRequest(
            `${Routes.Channels}/${this.id}/messages`,
            HttpRequestMethod.Post,
            JSON.stringify(payload),
        );
        if (response.status != 200) throw new Error(`Failed to send message: ${JSON.stringify(JSON.parse(response.body), null, 2)}`);
        const body = JSON.parse(response.body) as RawMessage
        const newMessage = new Message(this.client, body);
        this.messages.setMessage(newMessage.id, newMessage);

        return newMessage;
    }

}