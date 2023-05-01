import { model, Schema, models, Types } from "mongoose";
import { IDiscountModel } from "./_interfaces";

const DiscountSchema = new Schema<IDiscountModel>({
  title: { type: String, required: false },
  description: { type: String, required: false },
  discountAmount: { type: Number, required: false },
  index: { type: Number, required: false },
});

DiscountSchema.set("timestamps", true);

export default models.Discount ||
  model<IDiscountModel>("Discount", DiscountSchema);
