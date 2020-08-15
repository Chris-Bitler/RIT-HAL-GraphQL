import { Column, Model, Table } from "sequelize-typescript";

/**
 * Class representing an emoji->role instance
 */
@Table
export class EmojiToRole extends Model<EmojiToRole> {
    @Column
    emojiId!: string;

    @Column
    channelId!: string;

    @Column
    serverId!: string;

    @Column
    roleId!: string;
}
