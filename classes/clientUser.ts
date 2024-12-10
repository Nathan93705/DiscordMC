import { RawClientUser } from "DiscordMC/types/raw";

class ClientUser {
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

    constructor(data: RawClientUser) {
        this.id = data.id
        this.name = data.name
        this.icon = data.icon
        this.description = data.description
        this.type = data.type
        this.bot = data.bot
        this.summary = data.summary
        this.is_monetized = data.is_monetized
        this.is_verified = data.is_verified
        this.is_discoverable = data.is_discoverable
        this.bot_public = data.bot_public
        this.bot_require_code_grant = data.bot_require_code_grant
        this.flags = data.flags
        this.hook = data.hook
        this.redirect_uris = data.redirect_uris
        this.interactions_endpoint_url = data.interactions_endpoint_url
        this.role_connections_verification_url = data.role_connections_verification_url
        this.owner = data.owner
        this.approximate_guild_count = data.approximate_guild_count
        this.approximate_user_install_count = data.approximate_user_install_count
        this.interactions_version = data.interactions_version
        this.explicit_content_filter = data.explicit_content_filter
        this.rpc_application_state = data.rpc_application_state
        this.store_application_state = data.store_application_state
        this.verification_state = data.verification_state
        this.integration_public = data.integration_public
        this.integration_require_code_grant = data.integration_require_code_grant
        this.discoverability_state = data.discoverability_state
        this.discovery_eligibility_flags = data.discovery_eligibility_flags
        this.monetization_state = data.monetization_state
        this.verification_eligibility_flags = data.verification_eligibility_flags
        this.monetization_eligibility_flags = data.monetization_eligibility_flags
    }
}

export { ClientUser }