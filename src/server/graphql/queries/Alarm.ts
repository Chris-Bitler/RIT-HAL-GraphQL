import gql from "graphql-tag";

/**
 * Query type representing a message alarm
 */
export const Alarm = gql`
    type Alarm {
        lastUsed: Float
        channelId: String
        messageToSend: String
        hours: Int
        minutes: Int
        serverId: String
    }
`;