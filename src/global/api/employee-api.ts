import dbConnect from "./dbConnect";
import Employee from "../models/employee-model";
import { IResp } from "./_interfaces";
import { getErrorMessage } from "../utils";
import { IEmployeeModel } from "../models/_interfaces";

export const getAllEmployees = async (): Promise<
  IResp<IEmployeeModel[] | null>
> => {
  try {
    await dbConnect();
    const empoyees = await Employee.find({});
    return {
      data: empoyees,
      status: 200,
      success: true,
    };
  } catch (e) {
    const message = getErrorMessage(e);
    return {
      data: null,
      status: 500,
      success: false,
      message,
    };
  }
};
