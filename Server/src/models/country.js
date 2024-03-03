import { Schema, model } from "mongoose";

const CountrySchema = new Schema({
  name: String,
  capital: String,
  currency: String,
  continent: { type: Schema.Types.ObjectId, ref: "Continent" },
  language: { type: Schema.Types.ObjectId, ref: "Language" },
});

const Country = model("Country", CountrySchema);

export default Country;
