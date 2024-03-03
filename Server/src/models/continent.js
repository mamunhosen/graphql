import { Schema, model } from "mongoose";

const ContinentSchema = new Schema({
  name: String,
});

const Continent = model("Continent", ContinentSchema);

export default Continent;
