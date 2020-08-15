import {Guild} from "discord.js";
import {Alarm} from "../../models/Alarm";

/**
 * Resolver to get all alarms belonging to a server
 */
export const AlarmResolver = {
    /**
     * Get the alarms on a server
     * @param parent The guild being queried
     */
    alarm: async (parent: Guild) => {
        return Alarm.findAll({
            where: {
                serverId: parent.id
            }
        });
    }
}