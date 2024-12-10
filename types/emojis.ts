export type Emoji = {
    id: string;
    name: string;
    roles: string[];
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
};