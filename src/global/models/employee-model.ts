import { model, Schema, models, Types } from "mongoose";
import { IEmployeeModel } from "./_interfaces";

const EmployeeSchema = new Schema<IEmployeeModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  surname: { type: String, required: true },
  imgUrl: { type: String, required: true },
  position: { type: String, required: true },
  index: { type: Number, required: true },
});

EmployeeSchema.set("timestamps", true);

export default models.Employee ||
  model<IEmployeeModel>("Employee", EmployeeSchema);
