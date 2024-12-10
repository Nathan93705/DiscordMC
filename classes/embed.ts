import { EmbedAuthorOptions, EmbedData, EmbedField, EmbedFooterOptions } from "DiscordMC/types/embeds";

type HexColorString = `#${string}`;


export class EmbedBuilder {
    private _data: EmbedData
    get data() {
        return this._data
    }

    constructor(data?: EmbedData) {
        this._data = {
            color: 1015807,
            description: ""
        }
        if (data) this._data = data
    }

    /**
     * Sets the color of this embed.
     *
     * @param color - The color to use
     */
    setColor(color: HexColorString | null): this {
        this._data.color = color ? parseInt(color.slice(1), 16) : 1015807
        return this
    }

    /**
     * Sets the title for this embed.
     *
     * @param title - The title to use
     */
    setTitle(title: string | null): this {
        this._data.title = title ? title : undefined
        return this
    }

    /**
    * Removes, replaces, or inserts fields for this embed.
    */
    spliceFields(index: number, deleteCount: number, ...fields: EmbedField[]): this {
        this.addFields(...fields)
        if (this._data.fields)
            this._data.fields = this._data.fields.splice(index, deleteCount)

        return this
    }

    /**
     * Appends fields to the embed.
     */
    addFields(...fields: EmbedField[]): this {
        if (!this._data.fields) this._data.fields = []
        if (this._data.fields.length >= 25) return this
        for (const feild of fields) this._data.fields.push(feild)
        return this
    }

    /**
     * Sets the fields for this embed.
     */
    setFields(...fields: EmbedField[]): this {
        if (fields.length >= 25) fields = fields.slice(0, 25);
        this._data.fields = fields
        return this
    }

    /**
     * Sets the author of this embed.
     *
     * @param options - The options to use
     */
    setAuthor(options: EmbedAuthorOptions | null): this {
        this._data.author = options ? options : undefined
        return this
    }

    /**
     * Sets the description of this embed.
     *
     * @param description - The description to use
     */
    setDescription(description: string | null): this {
        this._data.description = description ? description : ""
        return this
    }

    /**
     * Sets the footer of this embed.
     *
     * @param options - The footer to use
     */
    setFooter(options: EmbedFooterOptions | null): this {
        this._data.footer = options ? options : undefined
        return this
    }

    /**
     * Sets the image of this embed.
     *
     * @param url - The image URL to use
     */
    setImage(url: string | null): this {
        this._data.image = url ? { url: url } : undefined
        return this
    }

    /**
     * Sets the thumbnail of this embed.
     *
     * @param url - The thumbnail URL to use
     */
    setThumbnail(url: string | null): this {
        this._data.thumbnail = url ? { url: url } : undefined
        return this
    }

    /**
     * Sets the timestamp of this embed.
     *
     * @param timestamp - The timestamp or date to use
     */
    setTimestamp(timestamp?: Date | number | null): this {
        this._data.timestamp = timestamp ? timestamp.toString() : undefined
        return this
    }

    /**
     * Sets the URL of this embed.
     *
     * @param url - The URL to use
     */
    setURL(url: string | null): this {
        this._data.url = url ? url : undefined
        return this
    }

    /**
     * Serializes this builder to API-compatible JSON data.
     *
     */
    toJSON(): EmbedData {
        return this._data
    };
}
