import { model, Schema, models, Types } from "mongoose";
import { IServiceModel } from "./_interfaces";

const ServiceSchema = new Schema<IServiceModel>({
  label: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  imgUrl: { type: String, required: true },
  employee: [{ type: Types.ObjectId, ref: "Employee", required: false }],
  subServices: [{ type: Types.ObjectId, ref: "SubService", required: false }],
  mainItems: { type: [String], required: false },
  index: { type: Number, required: true },
});

ServiceSchema.set("timestamps", true);

export default models.Service || model<IServiceModel>("Service", ServiceSchema);
