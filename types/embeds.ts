export interface EmbedField {
    name: string,
    value: string,
    inline?: boolean,
}

export interface EmbedFooterOptions {
    text: string,
    icon_url?: string,
}

export interface EmbedAuthorOptions {
    name: string,
    icon_url?: string,
    url?: string,
}

export interface EmbedData {
    color: number,
    title?: string,
    url?: string,
    author?: EmbedAuthorOptions,
    description: string,
    thumbnail?: {
        url: string,
    },
    fields?: EmbedField[]
    image?: {
        url: string,
    },
    timestamp?: string,
    footer?: EmbedFooterOptions
};