import { Column, DataType, Model, Table } from "sequelize-typescript";

/**
 * Model representing a server alarm
 */
@Table
export class Alarm extends Model<Alarm> {
    @Column(DataType.BIGINT)
    lastUsed!: number;

    @Column
    channelId!: string;

    @Column
    messageToSend!: string;

    @Column
    hours!: number;

    @Column
    minutes!: number;

    @Column
    serverId!: string;
}
