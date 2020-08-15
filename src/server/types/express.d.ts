import {DiscordManager} from "../discord/DiscordManager";

declare global {
    namespace Express {
        interface Request {
            discord: DiscordManager
        }
    }

    interface ApolloRequest {
        req: Express.Request;
    }
}