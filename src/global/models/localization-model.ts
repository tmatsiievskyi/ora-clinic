import { Schema, model, models } from "mongoose";
import { ILocalModel } from "./_interfaces";

export const LocalizationSchema = new Schema<ILocalModel>({
  lng: { type: String, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
});

LocalizationSchema.index({ key: 1, lng: 1 }, { unique: true });

export default models.Localization ||
  model<ILocalModel>("Localization", LocalizationSchema);
