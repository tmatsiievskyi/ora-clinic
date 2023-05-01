import { model, Schema, models, Types } from "mongoose";
import { IComplexModel } from "./_interfaces";

const ComplexSchema = new Schema<IComplexModel>({
  label: { type: String, required: true, unique: true },
  imgUrl: { type: String, required: true },
  group: {
    type: String,
    enum: ["male", "female", "child", "mix"],
    required: true,
  },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  sale: { type: Number, required: false },
  saleFamilyDoctor: { type: Number, required: false },
  price: { type: Number, required: false },
  priceFamilyDoctor: { type: Number, required: false },
  analyses: [{ type: Types.ObjectId, ref: "SubService" }],
  examination: [{ type: Types.ObjectId, ref: "SubService" }],
  consultations: [{ type: Types.ObjectId, ref: "SubService" }],
  index: { type: Number, required: true },
});

ComplexSchema.set("timestamps", true);

export default models.Complex || model<IComplexModel>("Complex", ComplexSchema);
