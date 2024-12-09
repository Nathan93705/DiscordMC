import { HttpRequestMethod, http } from "@minecraft/server-net";
import { CachedGuild, Guild } from "../lib/guild";
import { discordAPI } from "../utility";
import { Client } from "..";
import { system } from "@minecraft/server";


export class GuildManager {
    private _cache: Map<string, CachedGuild>;

    private client: Client

    constructor(client: Client) {
        this.client = client
        this.update()
        if (this.client.options.autoUpdates.guilds)
            system.runInterval(() => this.update(), this.client.options.autoUpdates.rate)
    }

    get cache() {
        return this._cache
    }
    async fetch(guild_ID: string) {
        const request = discordAPI(`guilds/${guild_ID}`, HttpRequestMethod.Get, this.client.token)
        const response = await http.request(request);
        const body = JSON.parse(response.body)
        return new Guild(body, this.client)
    }
    async update() {
        const request = discordAPI(`users/@me/guilds`, HttpRequestMethod.Get, this.client.token)
        const response = await http.request(request);
        const body = JSON.parse(response.body)

        if (!this._cache) this._cache = new Map<string, CachedGuild>()
        this._cache.clear()
        for (const data of body) {
            const guild = new CachedGuild(data.id, data.name, data.icon, data.permissions)
            this._cache.set(data.id, guild)
        }
    }

}
