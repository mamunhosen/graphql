export const typeDefs =`#graphql

    type Continent {
        id: ID!
        name: String!
        countries: [Country!]
    }

    type Country {
        id: ID!
        name: String!
        capital: String
        currency: String,
        language_id: ID!,
        continent_id: ID!,
        continent: Continent,
        language: Language
    }

    type Language {
        id: ID!
        name: String!
        code: String,
        countries: [Country!]
    }

    type Query {
        continents: [Continent!]!
        continent(id: ID!): Continent
        countries: [Country!]!
        country(id: ID!): Country
        languages: [Language!]!
        language(id: ID!): Language
    }

    type Mutation {
        addCountry(name: String!, capital: String, currency: String, continent_id: ID!, language_id: ID!): Country
        deleteCountry(id: ID!): Country
        addLanguage(name: String!, code: String): Language
    }


`