import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  vehicleId: String,
  lat: Number,
  lng: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Location", locationSchema);