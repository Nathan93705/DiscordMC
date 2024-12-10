import { HttpRequestMethod } from "@minecraft/server-net";
import { Client } from "DiscordMC/client";
import { MessagePayload, MessageReference, MessageReferenceType } from "DiscordMC/types/message";
import { RawMessage, RawPartialMessage } from "DiscordMC/types/raw";
import { Routes } from "DiscordMC/types/routes";
import { User } from "./user";
import { EmbedBuilder } from "./embed";
import { TextChannel } from "./channel";


export class PartialMessage {
    public content: string;
    public channel_id: string;
    public id: string;
    public embeds: EmbedBuilder[] = [];

    readonly client: Client;

    public constructor(client: Client, data: RawPartialMessage) {
        this.client = client;
        this.id = data.id;
        this.channel_id = data.channel_id;
        this.content = data.content;
        this.embeds = data.embeds.map(raw => new EmbedBuilder(raw))
    }
}


export class Message extends PartialMessage {

    type: number;
    content: string;
    mentions: any[];
    mention_roles: any[];
    attachments: any[];
    embeds: any[];
    timestamp: string;
    edited_timestamp: string | null;
    flags: number;
    components: any[];
    id: string;
    author: User
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;

    readonly client: Client;

    public constructor(client: Client, data: RawMessage) {
        super(client, {
            id: data.id,
            channel_id: data.channel_id,
            content: data.content,
            embeds: data.embeds,
        })
        this.client = client;

        this.type = data.type;
        this.content = data.content;
        this.mentions = data.mentions;
        this.mention_roles = data.mention_roles;
        this.attachments = data.attachments;
        this.embeds = data.embeds;
        this.timestamp = data.timestamp;
        this.edited_timestamp = data.edited_timestamp;
        this.flags = data.flags;
        this.components = data.components;
        this.id = data.id;
        this.channel_id = data.channel_id;
        this.author = new User(client, data.author);
        this.pinned = data.pinned;
        this.mention_everyone = data.mention_everyone;
        this.tts = data.tts;

    }

    static async fromPartial(partial: PartialMessage, client: Client): Promise<Message | undefined> {
        const response = await client.sendRequest(`${Routes.Channels}/${partial.channel_id}/messages/${partial.id}`, HttpRequestMethod.Get);
        if (response.status != 200) return;
        const rawMessage = JSON.parse(response.body) as RawMessage
        const message = new Message(client, rawMessage)
        return message
    }

    public edit(content: string): this {
        this.content = content;
        this.client.sendRequest(`${Routes.Channels}/${this.channel_id}/messages/${this.id}`, 'Patch' as HttpRequestMethod, this.serialize());

        return this;
    }


    public delete(): this {
        this.client.sendRequest(`${Routes.Channels}/${this.channel_id}/messages/${this.id}`, HttpRequestMethod.Delete);
        return this;
    }

    public async reply(message: MessagePayload | string): Promise<Message | undefined> {
        const payload = (typeof message == "string") ? { content: message } as MessagePayload : message

        if (!payload.message_reference) payload.message_reference = {
            message_id: this.id,
            channel_id: this.channel_id,
            type: MessageReferenceType.Default,
            fail_if_not_exists: false
        };

        const channel = await this.client.channels.resolve(this.channel_id);

        if (!channel || !channel.isTextBased()) return;
        const newMessage = await channel.send(payload);
        return newMessage;
    }

    public async test() {
        const response = await this.client.sendRequest(`${Routes.Channels}/${this.channel_id}/messages/${this.id}`, HttpRequestMethod.Get);
        console.log(JSON.stringify(JSON.parse(response.body), null, 2))
    }

    public serialize(): string {

        const serialized: MessagePayload = {
            content: this.content ?? '',
            embeds: this.embeds ?? undefined
        };

        return JSON.stringify(serialized);
    }
}