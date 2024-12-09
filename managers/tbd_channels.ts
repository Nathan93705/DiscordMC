import { HttpRequestMethod, http } from "@minecraft/server-net";
import { CachedGuild, Guild } from "../lib/guild";
import { discordAPI } from "../utility";
import { Client } from "..";
import { system } from "@minecraft/server";


export class ChannelManager {
    private _cache: Map<string, CachedGuild>;

    private client: Client

    constructor(client: Client) {
        this.client = client
        this.update()
        if (this.client.options.autoUpdates.channels)
            system.runInterval(() => this.update(), this.client.options.autoUpdates.rate)
    }

    get cache() {
        return this._cache
    }

    async update() {
        const request = discordAPI(`users/@me/channels`, HttpRequestMethod.Get, this.client.token)
        const response = await http.request(request);
        const body = JSON.parse(response.body)
        console.log(response.body)
        return
        if (!this._cache) this._cache = new Map<string, CachedGuild>()
        this._cache.clear()
        for (const data of body) {
            const guild = new CachedGuild(data.id, data.name, data.icon, data.permissions)
            this._cache.set(body.id, guild)
        }
    }

}
