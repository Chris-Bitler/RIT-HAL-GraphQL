import gql from "graphql-tag";

/**
 * Query type representing a server's admin mail config
 */
export const MailConfig = gql`
    type MailConfig {
        serverName: String
        adminChannelId: String
    }
`;