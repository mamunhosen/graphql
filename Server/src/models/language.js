import { Schema, model } from "mongoose";

const LanguageSchema = new Schema({
  name: String,
  code: String,
});

const Language = model("Language", LanguageSchema);

export default Language;
