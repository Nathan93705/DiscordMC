import { http, HttpHeader, HttpRequest, HttpRequestMethod } from "@minecraft/server-net";
import { ClientEvents } from "./events/clientEvents";
import { EventEmitter } from "./classes/emitter";
import { ClientReadyEventSignal } from "./events/ready";
import { GuildManager } from "./managers/guilds";
import { ClientUser } from "./classes/clientUser";
import { CommandManager } from "./managers/commands";
import { ChannelManager } from "./managers/channels";
import { RawClientUser } from "./types/raw";
import { Routes } from "./types/routes";

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

class Client extends EventEmitter<keyof ClientEvents, ClientEvents[keyof ClientEvents]> {

    readonly options: ClientOptions
    public readonly guilds: GuildManager = new GuildManager(this);
    public readonly commands: CommandManager = new CommandManager(this);
    public readonly channels: ChannelManager = new ChannelManager(this);

    private token: string
    private _user?: ClientUser

    get user() {
        return this._user
    }

    private _ready = false
    get ready() { return this._ready }

    constructor(options: ClientOptions) {
        super();
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

    }


    public login(token: string) {
        this.token = token;
        this.sendRequest(`${Routes.Applications}/@me`, HttpRequestMethod.Get).then(response => {

            const body = JSON.parse(response.body) as RawClientUser

            if (response.status != 200) throw new Error(`Failed to authenticate with Discord API: ${response.status}`);

            this._user = new ClientUser(body)

            this._ready = true

            this.emit(new ClientReadyEventSignal(this, this.token))

            console.log(`[DiscordMC] Logged in as ${this._user.bot.username}#${this._user.bot.discriminator}`)
        })
    }

    public sendRequest(uri: string, method: HttpRequestMethod, body?: string) {
        const request = new HttpRequest(uri);

        request.method = method as HttpRequestMethod;
        if (body != undefined) request.body = body;
        request.headers = [new HttpHeader('Content-Type', 'application/json'), new HttpHeader('Authorization', `Bot ${this.token}`)];

        return http.request(request);
    }






    public on<T extends keyof ClientEvents>(event: T, listener: (event: ClientEvents[T]) => void): void {
        super.on(event, listener);
    }

    public removeListener<T extends keyof ClientEvents>(event: T, listener: (event: ClientEvents[T]) => void): void {
        super.removeListener(event, listener);
    }

    public once<T extends keyof ClientEvents>(event: T, listener: (event: ClientEvents[T]) => void): void {
        super.once(event, listener);
    }




    async test() {
        if (!this.ready) throw Error(`Bot Not Ready Yet`)
        const response = await this.sendRequest(`guilds`, HttpRequestMethod.Get)
        return response
    }


}


export { Client }