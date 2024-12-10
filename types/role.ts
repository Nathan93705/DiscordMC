export type Role = {
    id: string;
    name: string;
    description?: string;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon?: string;
    unicode_emoji?: string;
    tags?: any;
    flags: number;
};