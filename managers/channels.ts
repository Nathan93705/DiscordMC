import { BaseChannel, TextChannel } from "DiscordMC/classes/channel";
import { Client } from "DiscordMC/client";
import { BaseCache } from "./cache";
import { HttpRequestMethod } from "@minecraft/server-net";
import { ChannelType } from "DiscordMC/types/channel";
import { RawChannel } from "DiscordMC/types/raw";
import { Routes } from "DiscordMC/types/routes";

export class ChannelManager extends BaseCache<BaseChannel> {
    constructor(client: Client) {
        super(client);
    }

    public async resolve(channelId: string): Promise<BaseChannel | undefined> {
        if (this.cache.has(channelId)) return this.cache.get(channelId);
        const response = await this.client.sendRequest(`${Routes.Channels}/${channelId}`, HttpRequestMethod.Get);

        if (response.status != 200) return undefined;
        const rawData = JSON.parse(response.body) as RawChannel;

        switch (rawData.type) {
            case ChannelType.GuildText: {
                const channel = new TextChannel(this.client, rawData);
                this.cache.set(channelId, channel);
                return channel;
            }
        }
    }

    public setChannel(channelId: string, channel: BaseChannel) {
        this.cache.set(channelId, channel);
    }

    public getChannels(): Array<BaseChannel> {
        return Array.from(this.cache.values());
    }
}