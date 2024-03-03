import { Schema, model } from "mongoose";

const ContinentSchema = new Schema({
  name: String,
});

const Continent = model("Continent", ContinentSchema);

const CountrySchema = new Schema({
  name: String,
  capital: String,
  currency: String,
  continent: { type: Schema.Types.ObjectId, ref: "Continent" },
  language: { type: Schema.Types.ObjectId, ref: "Language" },
});

const Country = model("Country", CountrySchema);

const LanguageSchema = new Schema({
  name: String,
  code: String,
});

const Language = model("Language", LanguageSchema);

export const resolvers = {
  Query: {
    continents: async () => await Continent.find(),
    continent: async (_, { id }) => await Continent.findById(id),
    countries: async () => await Country.find().populate("continent language"),
    country: async (_, { id }) =>
      await Country.findById(id).populate("continent language"),
    languages: async () => await Language.find(),
    language: async (_, { id }) => await Language.findById(id),
  },
  Mutation: {
    addContinent: async (_, { name }) => {
      const newContinent = new Continent({ name });
      await newContinent.save();
    },
    addCountry: async (
      _,
      { name, capital, currency, continent_id, language_id }
    ) => {
      const newCountry = new Country({
        name,
        capital,
        currency,
        continent: continent_id,
        language: language_id,
      });
      await newCountry.save();
      return newCountry;
    },
    addLanguage: async (_, { name, code }) => {
      const newLanguage = new Language({ name, code });
      await newLanguage.save();
    },
  },
};
