import gql from "graphql-tag";

/**
 * Query type representing a ConfigProperty
 */
export const ConfigProperty = gql`
    type ConfigProperty {
        value: String
    }
`;