import gql from "graphql-tag";

/**
 * Query type representing a discord server role
 */
export const Role = gql`
    type Role {
        id: String
        name: String
    }
`;