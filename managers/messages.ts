import { HttpRequestMethod } from "@minecraft/server-net";
import { TextChannel } from "../classes/channel";
import { Client } from "../client";
import { BaseCache } from "./cache";
import { Message, PartialMessage } from "../classes/message";
import { RawMessage, RawPartialMessage } from "DiscordMC/types/raw";
import { Routes } from "DiscordMC/types/routes";

export class MessageManager extends BaseCache<Message> {
    private channel: TextChannel;
    protected partialCache: Map<string, PartialMessage> = new Map();

    public constructor(client: Client, channel: TextChannel) {
        super(client);
        this.channel = channel;
    }

    public getMessages(): Array<Message> {
        return Array.from(this.cache.values());
    }

    public setMessage(messageId: string, message: Message): void {
        this.cache.set(messageId, message);
    }
    public async resolve(messageId: string, partial: true): Promise<PartialMessage | undefined>;
    public async resolve(messageId: string, partial: false | undefined): Promise<Message | undefined>;

    public async resolve(messageId: string, partial: boolean): Promise<PartialMessage | Message | undefined> {
        if (partial) {
            if (this.partialCache.has(messageId)) return this.partialCache.get(messageId);
            return (await this.fetch()).find(partialGuild => partialGuild.id == messageId)
        }
        if (this.cache.has(messageId)) return this.cache.get(messageId);
        const response = await this.client.sendRequest(`${Routes.Channels}/${this.channel.id}/messages/${messageId}`, HttpRequestMethod.Get);
        if (response.status !== 200) return;

        const rawMessages = JSON.parse(response.body) as RawMessage
        const message = new Message(this.client, rawMessages);

        this.cache.set(messageId, message);
        return message;
    }

    public async fetch(): Promise<PartialMessage[]> {
        const response = await this.client.sendRequest(
            `${Routes.Channels}/${this.channel.id}/messages`,
            HttpRequestMethod.Get
        );
        if (response.status != 200) return;

        const rawPartialMessages = JSON.parse(response.body) as RawPartialMessage[]
        const partialMessages = rawPartialMessages.map(rawPartialMessage => new PartialMessage(this.client, rawPartialMessage))
        for (const partialMessage of partialMessages) {
            this.partialCache.set(partialMessage.id, partialMessage);
        }
        return partialMessages
    }

    public async getLastMessage(): Promise<Message | undefined> {
        if (this.cache.size > 0) return this.getMessages()[0];

        const response = await this.client.sendRequest(`${Routes.Channels}/${this.channel.id}/messages?limit=1`, HttpRequestMethod.Get);

        if (response.status != 200) return;
        const message = new Message(this.client, JSON.parse(response.body)[0]);
        this.setMessage(message.id, message);
        return message;
    }
}