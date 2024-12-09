import { http, HttpRequestMethod } from "@minecraft/server-net";
import { discordAPI } from "../utility";
import { Client } from "..";
import { CategoryChannel, ChannelType, GuildChannel, TextChannel, VoiceChannel } from "./channels";

export class CachedGuild {
    readonly id: string
    readonly name: string
    readonly icon: string | null
    readonly permissions: string

    constructor(id: string, name: string, icon: string, permissions: string) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.permissions = permissions;
    }

    bannerURL() {
        if (!this.icon) return null
        return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}`
    }
}




type Role = {
    id: string;
    name: string;
    description: string | null;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon: string | null;
    unicode_emoji: string | null;
    tags?: { bot_id: string };
    flags: number;
};

type Emoji = {
    id: string;
    name: string;
    roles: string[];
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
};

export class Guild {
    id: string;
    name: string;
    icon: string | null;
    description: string | null;
    home_header: string | null;
    splash: string | null;
    discovery_splash: string | null;
    features: string[];
    banner: string | null;
    owner_id: string;
    application_id: string | null;
    region: string;
    afk_channel_id: string | null;
    afk_timeout: number;
    system_channel_id: string | null;
    system_channel_flags: number;
    widget_enabled: boolean;
    widget_channel_id: string | null;
    verification_level: number;
    roles: Role[];
    default_message_notifications: number;
    mfa_level: number;
    explicit_content_filter: number;
    max_presences: number | null;
    max_members: number;
    max_stage_video_channel_users: number;
    max_video_channel_users: number;
    vanity_url_code: string | null;
    premium_tier: number;
    premium_subscription_count: number;
    preferred_locale: string;
    rules_channel_id: string | null;
    safety_alerts_channel_id: string | null;
    public_updates_channel_id: string | null;
    hub_type: string | null;
    premium_progress_bar_enabled: boolean;
    latest_onboarding_question_id: string | null;
    nsfw: boolean;
    nsfw_level: number;
    emojis: Emoji[];
    stickers: any[]; // Replace with appropriate type if needed
    incidents_data: any | null; // Replace with appropriate type if needed
    inventory_settings: any | null; // Replace with appropriate type if needed
    embed_enabled: boolean;
    embed_channel_id: string | null;

    readonly client: Client

    constructor(data: any, client: Client) {
        this.client = client
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.home_header = data.home_header;
        this.splash = data.splash;
        this.discovery_splash = data.discovery_splash;
        this.features = data.features;
        this.banner = data.banner;
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

    async getChannels(): Promise<GuildChannel[]> {
        const request = discordAPI(`guilds/${this.id}/channels`, HttpRequestMethod.Get, this.client.token)

        const response = await http.request(request);

        const body = JSON.parse(response.body)
        const channels: GuildChannel[] = []
        for (const data of body) {
            switch (data.type) {
                case ChannelType.GuildCategory:
                    channels.push(new CategoryChannel(data, this.client));
                    break;
                case ChannelType.GuildText:
                    channels.push(new TextChannel(data, this.client));
                    break;
                case ChannelType.GuildVoice:
                    channels.push(new VoiceChannel(data, this.client));
                    break;
                default:
                    channels.push(new GuildChannel(data, this.client))
            }
        }
        return channels
    }
}