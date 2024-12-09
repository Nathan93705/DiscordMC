import { system } from "@minecraft/server"
import { Client } from ".."
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