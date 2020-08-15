import {Guild} from "discord.js";
import {ConfigProperty} from "../../models/ConfigProperty";

/**
 * Get a config property for a server
 */
export const ConfigPropertyResolver = {
    /**
     * Get a config property for a server
     * @param parent The server the config property belongs to
     * @param args Object containing 'key' value representing
     *  the name of the config property
     */
    configProperty: async (parent: Guild, args: any) => {
        const propertyName = args.key;
        return ConfigProperty.findOne({
            where: {
                serverId: parent.id,
                key: propertyName
            }
        });
    }
}