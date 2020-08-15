import gql from "graphql-tag";

/**
 * Query type representing a Discord channel
 */
export const Channel = gql`
    type Channel {
        name: String
        id: String
        type: String
    }
`;