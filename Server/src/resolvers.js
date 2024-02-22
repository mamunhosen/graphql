import { connect, Schema, model } from "mongoose";

async function connectToMongo() {
  try {
    const mongo_uri =
      process.env.MONGO_URI || "mongodb://db:27017/locale_information";
    console.log("Connecting to MongoDB...", mongo_uri);
    await connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToMongo();

const ContinentSchema = new Schema({
  name: String,
});

const LanguageSchema = new Schema({
  name: String,
  code: String,
});

const CountrySchema = new Schema({
  name: String,
  capital: String,
  currency: String,
  continent: { type: Schema.Types.ObjectId, ref: "Continent" },
  language: { type: Schema.Types.ObjectId, ref: "Language" },
});

const Continent = model("Continent", ContinentSchema);
const Language = model("Language", LanguageSchema);
const Country = model("Country", CountrySchema);

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

  Continent: {
    countries: async (parent) => {
      // Use dynamic ref or static ref based on your use case
      const ref = parent.__isModel ? parent.model("Country") : Country;
      return await ref.find({ continent: parent._id });
    },
  },

  Country: {
    continent: async (parent) => await Continent.findById(parent.continent),
    language: async (parent) => await Language.findById(parent.language),
  },

  Language: {
    countries: async (parent) => {
      // Use dynamic ref or static ref based on your use case
      const ref = parent.__isModel ? parent.model("Country") : Country;
      return await ref.find({ language: parent._id });
    },
  },

  Mutation: {
    addContinent: async (_, { name }) => {
      const newContinent = new Continent({ name });
      await newContinent.save();
      return newContinent;
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
    // ... other mutations with similar adjustments
  },
};
