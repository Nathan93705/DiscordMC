import { http, HttpRequestMethod } from "@minecraft/server-net";
import { discordAPI } from "./utility";
import { GuildManager } from "./managers/guilds";
import { system } from "@minecraft/server";
import { ChannelManager } from "./managers/tbd_channels";
import { CommandManger } from "./managers/commands";

interface ClientOptions {
    autoUpdates?: {
        guilds?: boolean
        channels?: boolean
        users?: boolean
        rate?: number
    }
    commandPrefix?: string
    commandCheckRate?: number
}

type eventNames = "ready"

export class Client {

    readonly token: string
    readonly options: ClientOptions

    private _ready = false
    get ready() { return this._ready }

    constructor(token: string, options: ClientOptions) {

        this.token = token
        this.options = {
            autoUpdates: {
                guilds: true,
                channels: true,
                users: true,
                rate: 6000,
                ...(options.autoUpdates ?? {}),
            },
            commandPrefix: options.commandPrefix ?? "!",
            commandCheckRate: options.commandCheckRate ?? 40,
        };

        this.start()
    }










    /*
    Event Listeners
    */
    private events: Record<eventNames, (() => void)[]> = {} as Record<eventNames, (() => void)[]>;

    on(event: eventNames, listener: () => void) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event: eventNames, listener: () => void): void {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(l => l !== listener);

        if (this.events[event].length === 0) {
            delete this.events[event];
        }
    }

    emit(event: eventNames): void {
        if (!this.events[event]) return;

        for (const listener of this.events[event]) {
            listener();
        }
    }

    once(event: eventNames, listener: () => void): void {
        const wrapper = () => {
            listener();
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }









    private _guilds: GuildManager
    get guilds() {
        return this._guilds
    }

    private _commands: CommandManger
    get commands() {
        return this._commands
    }

    /*
    private _channels: ChannelManager
    get channels() {
        return this._channels
    }
    */

    private async start() {

        const request = discordAPI(`users/@me`, HttpRequestMethod.Get, this.token)
        const response = await http.request(request);
        const body = JSON.parse(response.body)
        if (response.status == 401) {
            console.error(`Error Sigining Into Discord Bot: Invalid Token`)
            this._ready = false
            return
        }

        this._ready = true

        const data: ClientUser = {
            id: body.id,
            username: body.username,
            avatar: body.avatar,
            discriminator: body.discriminator,
            banner: body.banner,
            locale: body.locale,
            verified: body.verified,
            bio: body.bio
        }
        this._user = data

        console.log(`[DiscordMC] Signed in as ${this.user.username}#${this.user.discriminator}`)

        this._guilds = new GuildManager(this)
        this._commands = new CommandManger(this)
        //this._channels = new ChannelManager(this)

        const interval = system.runInterval(() => {
            if (this._guilds.cache)
                //To Be Added Later
                /*if (this._channels.cache)*/ {
                system.clearRun(interval)
                this.emit("ready")
            }
        }, 40)
    }


    private _user: ClientUser

    get user() {
        return this._user
    }





    /**
     * Must Be Ran Within A `System.run()`
     * @param channel_ID Discord Channel ID
     * @param message string
     * @returns 
     */
    async sendMessage(channel_ID: string, message: string) {
        if (!this.ready) throw Error(`Bot Not Ready Yet`)
        if (!message.trim()) {
            console.error("Message content cannot be empty or whitespace.");
            return;
        }

        if (message.length > 2000) {
            console.error("Message exceeds Discord's 2000 character limit.");
            return;
        }

        const request = discordAPI(`channels/${channel_ID}/messages`, HttpRequestMethod.Post, this.token)

        const body = {
            content: message
        }
        request.body = JSON.stringify(body)

        await http.request(request);

    }

    /**
     * Must Be Ran Within A `System.run()`
     * @param channel_ID Discord Channel ID
     * @returns 
     */
    async getMessages(channel_ID: string) {
        if (!this.ready) throw Error(`Bot Not Ready Yet`)
        const request = discordAPI(`channels/${channel_ID}/messages`, HttpRequestMethod.Get, this.token)

        const response = http.request(request);
        return response
    }



    async getGuild(guild_ID: string) {
        if (!this.ready) throw Error(`Bot Not Ready Yet`)
        const request = discordAPI(`guilds/${guild_ID}`, HttpRequestMethod.Get, this.token)
        const response = http.request(request);
        return response
    }



    async test() {
        if (!this.ready) throw Error(`Bot Not Ready Yet`)
        const request = discordAPI(`guilds`, HttpRequestMethod.Get, this.token)
        const response = http.request(request);
        return response
    }


}


interface ClientUser {
    "id": string,
    "username": string,
    "avatar": string,
    "discriminator": string,
    "banner": string,
    "locale": string,
    "verified": true,
    "bio": string
}
