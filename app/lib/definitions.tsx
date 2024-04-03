import mongoose from "mongoose";

// TODO can we put HorseData straight into here?
export const horseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  breed: String,
  dateCreated: { type: Date, default: Date.now() },
  dateLastEdited: { type: Date, default: Date.now() }
});

export const Horse =
  mongoose.models.Horse || mongoose.model('Horse', horseSchema);
