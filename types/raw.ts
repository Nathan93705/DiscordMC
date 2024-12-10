import { Role } from "./role";
import { Emoji } from "./emojis";
import { EmbedData } from "./embeds";

export interface RawUser {
    id: string;
    username: string;
    discriminator: string;
    bot?: boolean;
    email?: string;
    accent_color?: number;
    locale?: string;
    flags?: number;
    public_flags?: number;
    verified?: boolean;
    avatar?: string;
    banner?: string;
}

export interface RawClientUser {
    id: string;
    name: string;
    icon: string;
    description: string;
    type: any;
    bot: {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        public_flags: number;
        flags: number;
        bot: boolean;
        banner: string;
        accent_color: any;
        global_name: any;
        avatar_decoration_data: any;
        banner_color: any;
        clan: any;
        primary_guild: any;
    };
    summary: string;
    is_monetized: boolean;
    is_verified: boolean;
    is_discoverable: boolean;
    bot_public: boolean;
    bot_require_code_grant: boolean;
    flags: number;
    hook: boolean;
    redirect_uris: string[];
    interactions_endpoint_url: any;
    role_connections_verification_url: any;
    owner: {
        id: string;
        username: string;
        avatar: any;
        discriminator: string;
        public_flags: number;
        flags: number;
        banner: any;
        accent_color: any;
        global_name: any;
        avatar_decoration_data: any;
        banner_color: any;
        clan: any;
        primary_guild: any;
    };
    approximate_guild_count: number;
    approximate_user_install_count: number;
    interactions_version: number;
    explicit_content_filter: number;
    rpc_application_state: number;
    store_application_state: number;
    verification_state: number;
    integration_public: boolean;
    integration_require_code_grant: boolean;
    discoverability_state: number;
    discovery_eligibility_flags: number;
    monetization_state: number;
    verification_eligibility_flags: number;
    monetization_eligibility_flags: number;
}

export interface RawPartialGuild {
    id: string
    name: string
    icon?: string
    banner?: string
}

export interface RawGuild {
    id: string;
    name: string;
    icon?: string;
    description?: string;
    home_header?: string;
    splash?: string;
    discovery_splash?: string;
    features: string[];
    banner?: string;
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
}

export interface RawChannel {
    id: string,
    type: number,
    last_message_id?: string,
    flags: number,
    guild_id: string,
    name: string,
    parent_id?: string,
    rate_limit_per_user: number,
    topic?: null | any,
    permission_overwrites: any[],
    nsfw: boolean
}

export interface RawPartialMessage {
    id: string;
    content: string;
    channel_id: string;
    embeds?: Array<EmbedData>;
}

export interface RawMessage {
    type: number,
    content: string,
    mentions: any[],
    mention_roles: any[],
    attachments: any[],
    embeds: EmbedData[],
    timestamp: string,
    edited_timestamp?: string,
    flags: number,
    components: any[],
    id: string,
    channel_id: string,
    author: RawUser,
    pinned: boolean,
    mention_everyone: boolean,
    tts: boolean
}


