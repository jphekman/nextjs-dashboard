import mongoose from "mongoose";
//import connectDB from "./connectDB";

console.log("Building Mongoose schemas.");

export const horseSchema = new mongoose.Schema({
  id: String,
  name: {type: String, required: true},
  breed: String,
  dateCreated: { type: Date, default: Date.now() },
  dateLastEdited: { type: Date, default: Date.now() }
});

export const Horse =
  mongoose.models.Horse || mongoose.model('Horse', horseSchema);

// DELETEME
//let starbuck = new Horse({ name: 'Starbuck', breed: 'Paint', dateLastEdited: Date.now });
//starbuck.save();
