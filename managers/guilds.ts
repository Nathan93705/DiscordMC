import { HttpRequestMethod } from "@minecraft/server-net";
import { Client } from "../client";
import { BaseCache } from "./cache";
import { Guild, PartialGuild } from "../classes/guids";
import { RawGuild, RawPartialGuild } from "DiscordMC/types/raw";
import { Routes } from "DiscordMC/types/routes";


class GuildManager extends BaseCache<Guild> {


    protected partialCache: Map<string, PartialGuild> = new Map();

    constructor(client: Client) {
        super(client);
    }

    public async resolve(guildId: string, partial: true): Promise<PartialGuild | undefined>;
    public async resolve(guildId: string, partial: false | undefined): Promise<Guild | undefined>;

    public async resolve(guildId: string, partial: boolean): Promise<Guild | PartialGuild | undefined> {
        if (partial) {
            if (this.partialCache.has(guildId)) return this.partialCache.get(guildId);
            return (await this.fetch()).find(partialGuild => partialGuild.id == guildId)
        }
        if (this.cache.has(guildId)) return this.cache.get(guildId);
        const response = await this.client.sendRequest(`${Routes.Guilds}/${guildId}`, HttpRequestMethod.Get);
        if (response.status !== 200) return;

        const rawGuilds = JSON.parse(response.body) as RawGuild
        const guild = new Guild(this.client, rawGuilds);

        this.cache.set(guildId, guild);
        return guild;
    }


    public async fetch(): Promise<PartialGuild[]> {
        const response = await this.client.sendRequest(
            `${Routes.Users}/@me/guilds`,
            HttpRequestMethod.Get
        );
        if (response.status != 200) return;

        const rawguilds = JSON.parse(response.body) as RawPartialGuild[]
        const cachedGuilds = rawguilds.map(rawguild => new PartialGuild(this.client, rawguild))
        for (const guild of cachedGuilds) {
            this.partialCache.set(guild.id, guild);
        }
        return cachedGuilds
    }
}
export { GuildManager }
