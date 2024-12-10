import { HttpRequestMethod } from "@minecraft/server-net";
import { Client } from "../client";
import { Role } from "../types/role";
import { Channels, ChannelType } from "DiscordMC/types/channel";
import { TextChannel } from "./channel";
import { ChannelManager } from "DiscordMC/managers/channels";
import { Emoji } from "DiscordMC/types/emojis";
import { RawPartialGuild, RawGuild, RawChannel } from "DiscordMC/types/raw";
import { Routes } from "DiscordMC/types/routes";

export class PartialGuild {
    readonly id: string
    readonly name: string
    readonly icon?: string
    readonly banner?: string
    readonly permissions: string
    readonly features: any[]

    readonly client: Client

    constructor(client: Client, data: RawPartialGuild) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.banner = data.banner;
        this.client = client
    }

    public iconURL() {
        if (!this.icon) return null
        return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}`
    }
    public bannerURL() {
        if (!this.banner) return null
        return `https://cdn.discordapp.com/banners/${this.id}/${this.banner}`
    }
}


export class Guild extends PartialGuild {
    description?: string;
    home_header?: string;
    splash?: string;
    discovery_splash?: string;
    features: string[];
    owner_id?: string;
    application_id?: string;
    region: string;
    afk_channel_id?: string;
    afk_timeout: number;
    system_channel_id?: string;
    system_channel_flags: number;
    widget_enabled: boolean;
    widget_channel_id?: string;
    verification_level: number;
    roles: Role[];
    default_message_notifications: number;
    mfa_level: number;
    explicit_content_filter: number;
    max_presences?: number;
    max_members: number;
    max_stage_video_channel_users: number;
    max_video_channel_users: number;
    vanity_url_code?: string;
    premium_tier: number;
    premium_subscription_count: number;
    preferred_locale: string;
    rules_channel_id?: string;
    safety_alerts_channel_id: string;
    public_updates_channel_id?: string;
    hub_type?: string;
    premium_progress_bar_enabled: boolean;
    latest_onboarding_question_id?: string;
    nsfw: boolean;
    nsfw_level: number;
    emojis: Emoji[];
    stickers: any[];
    incidents_data?: any;
    inventory_settings?: any;
    embed_enabled: boolean;
    embed_channel_id?: string;

    readonly client: Client

    public readonly channels: ChannelManager;

    constructor(client: Client, data: RawGuild) {
        super(client, {
            id: data.id,
            name: data.name,
            icon: data.icon,
            banner: data.banner
        })

        this.channels = new ChannelManager(client)

        this.client = client
        this.description = data.description;
        this.home_header = data.home_header;
        this.splash = data.splash;
        this.discovery_splash = data.discovery_splash;
        this.features = data.features;
        this.owner_id = data.owner_id;
        this.application_id = data.application_id;
        this.region = data.region;
        this.afk_channel_id = data.afk_channel_id;
        this.afk_timeout = data.afk_timeout;
        this.system_channel_id = data.system_channel_id;
        this.system_channel_flags = data.system_channel_flags;
        this.widget_enabled = data.widget_enabled;
        this.widget_channel_id = data.widget_channel_id;
        this.verification_level = data.verification_level;
        this.roles = data.roles;
        this.default_message_notifications = data.default_message_notifications;
        this.mfa_level = data.mfa_level;
        this.explicit_content_filter = data.explicit_content_filter;
        this.max_presences = data.max_presences;
        this.max_members = data.max_members;
        this.max_stage_video_channel_users = data.max_stage_video_channel_users;
        this.max_video_channel_users = data.max_video_channel_users;
        this.vanity_url_code = data.vanity_url_code;
        this.premium_tier = data.premium_tier;
        this.premium_subscription_count = data.premium_subscription_count;
        this.preferred_locale = data.preferred_locale;
        this.rules_channel_id = data.rules_channel_id;
        this.safety_alerts_channel_id = data.safety_alerts_channel_id;
        this.public_updates_channel_id = data.public_updates_channel_id;
        this.hub_type = data.hub_type;
        this.premium_progress_bar_enabled = data.premium_progress_bar_enabled;
        this.latest_onboarding_question_id = data.latest_onboarding_question_id;
        this.nsfw = data.nsfw;
        this.nsfw_level = data.nsfw_level;
        this.emojis = data.emojis;
        this.stickers = data.stickers;
        this.incidents_data = data.incidents_data;
        this.inventory_settings = data.inventory_settings;
        this.embed_enabled = data.embed_enabled;
        this.embed_channel_id = data.embed_channel_id;
    }

    public async fetchChannels() {
        const response = await this.client.sendRequest(`${Routes.Guilds}/${this.id}/channels`, HttpRequestMethod.Get);
        const rawChannels = JSON.parse(response.body) as RawChannel[]
        for (const raw of rawChannels) {
            let constructor: Channels[keyof Channels];
            switch (raw.type) {
                case ChannelType.GuildText:
                    constructor = TextChannel
                    break;
            }
            if (!constructor) continue;
            const channel = new constructor(this.client, raw)
            this.channels.setChannel(channel.id, channel);
        }
    }
}