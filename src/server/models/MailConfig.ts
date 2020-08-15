import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

/**
 * Model representing an admin mail config
 */
@Table
export class MailConfig extends Model<MailConfig> {
    @PrimaryKey
    @Column
    serverName!: string;

    @Column
    serverId!: string;

    @Column
    adminChannelId!: string;
}