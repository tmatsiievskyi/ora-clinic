import { model, Schema, models, Types } from "mongoose";
import { ISubServiceModel } from "./_interfaces";

const SubServiceSchema = new Schema<ISubServiceModel>({
  label: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: false },
  outsource: { type: Boolean, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  searchTags: { type: [String], required: false },
  index: { type: Number, required: true },
});

SubServiceSchema.set("timestamps", true);

export default models.SubService ||
  model<ISubServiceModel>("SubService", SubServiceSchema);
