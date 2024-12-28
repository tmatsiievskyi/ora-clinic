import mongoose, { model, Schema, models, Types } from "mongoose";
import { ISubServiceModel } from "./_interfaces";

const SubServiceSchema = new Schema<ISubServiceModel>({
  label: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: false },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  serviceName: { type: String, required: true },
  outsource: { type: Boolean, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  pricePrefix: { type: String, required: false },
  priceSuffix: { type: String, required: false },
  archived: { type: Boolean, required: false },
  searchTags: { type: [String], required: false },
  index: { type: Number, required: true },
});

SubServiceSchema.set("timestamps", true);

export default mongoose.models.SubService ||
  model<ISubServiceModel>("SubService", SubServiceSchema);
