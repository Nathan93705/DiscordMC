import { system } from "@minecraft/server";
import { Client } from "../client";
import { BaseCache } from "./cache";
import { HttpRequestMethod } from "@minecraft/server-net";
import { Message, PartialMessage } from "DiscordMC/classes/message";
import { ClientEvent } from "DiscordMC/types/events";
import { RawMessage, RawPartialMessage } from "DiscordMC/types/raw";
import { Routes } from "DiscordMC/types/routes";
import { CommandRunEventSignal } from "DiscordMC/events/commandRun";
import { MessageCreateEventSignal } from "DiscordMC/events/messageCreate";

type CommandCallback = (message: Message, paramaters: string[]) => void

export class CommandManager extends BaseCache<CommandCallback> {

    constructor(client: Client) {
        super(client);
        this.client.once(ClientEvent.Ready, () => system.runTimeout(() => this.start(), 20))
    }

    public register(commandName: string, callback: CommandCallback) {
        this.cache.set(commandName, callback)
    }

    private interval: number;
    public async start() {

        const prefix = this.client.options.commandPrefix

        const guilds = await this.client.guilds.fetch()
        const guild_IDs = guilds.map(partial => partial.id)

        for (const guild_ID of guild_IDs) {

            const guild = await this.client.guilds.resolve(guild_ID, false)
            await guild.fetchChannels()
            const channels = guild.channels.getChannels().map(channel => channel.id)

            for (const channel_ID of channels) {

                let latestMessageID = ""

                const response = await this.client.sendRequest(`${Routes.Channels}/${channel_ID}/messages?limit=1`, HttpRequestMethod.Get);
                if (response.status != 200) return;

                const message = JSON.parse(response.body)[0] as RawPartialMessage

                latestMessageID = message.id

                this.interval = system.runInterval(async () => {

                    const response = await this.client.sendRequest(`${Routes.Channels}/${channel_ID}/messages?after=${latestMessageID}`, HttpRequestMethod.Get);
                    if (response.status != 200) return;

                    const messages = JSON.parse(response.body) as RawPartialMessage[]

                    for (const rawPartialMessage of messages) {

                        const response = await this.client.sendRequest(`${Routes.Channels}/${channel_ID}/messages/${rawPartialMessage.id}`, HttpRequestMethod.Get);
                        if (response.status != 200) return;
                        const rawMessage = JSON.parse(response.body) as RawMessage
                        const message = new Message(this.client, rawMessage)

                        this.client.emit(new MessageCreateEventSignal(message))

                        latestMessageID = rawPartialMessage.id

                        if (!rawPartialMessage.content.startsWith(prefix)) continue

                        const sections = rawPartialMessage.content.slice(prefix.length).split(` `)
                        const command = sections[0]
                        const args = sections.slice(1);

                        const callback = this.cache.get(command)

                        if (callback) {
                            this.client.emit(new CommandRunEventSignal(command, args, message))

                            callback(message, args)
                        }
                    }
                }, this.client.options.commandCheckRate)
            }
        }
    }


    public stop() {
        system.clearRun(this.interval)
        this.interval = undefined
    }

}

/*
import { system } from "@minecraft/server"
import { Client } from "../client"
import { ChannelType, TextChannel } from "../lib/channels"

interface CommandData {
    name: string,
    callback: (paramaters: string[]) => void
}

export class CommandManger {

    private commands: CommandData[] = []

    private client: Client

    constructor(client: Client) {
        this.client = client
        this.start()
        this.client.once("ready", () => this.start())
    }
    private interval: number
    async start() {
        if (this.interval) return
        this.interval = system.runInterval(async () => {
            const guilds = this.client.guilds.cache
            for (const [id] of guilds) {
                const guild = await this.client.guilds.fetch(id)
                const channels = (await guild.getChannels()).filter(channel => channel.type == ChannelType.GuildText) as TextChannel[]


            }
        }, this.client.options.commandCheckRate)
    }
    async stop() {
        system.clearRun(this.interval)
        this.interval = undefined
    }
}
    */