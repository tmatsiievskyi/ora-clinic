import dbConnect from "./dbConnect";
import Service from "../models/service-model";
import Employee from "../models/employee-model";
import { IResp } from "./_interfaces";
import { getErrorMessage } from "../utils";
import { IServiceModel } from "../models/_interfaces";

export const getAllService = async (): Promise<
  IResp<IServiceModel[] | null>
> => {
  try {
    await dbConnect();
    const result = await Service.find({});
    return {
      data: result,
      status: 200,
      success: true,
    };
  } catch (e) {
    const message = getErrorMessage(e);
    throw new Error(message);
  }
};

export const getServiceById = async (
  id: string | string[],
): Promise<IResp<IServiceModel | null>> => {
  try {
    await dbConnect();

    const service = await Service.findById(id).populate({
      path: "employee",
      model: Employee,
    });

    return {
      data: service,
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

export const getFirstService = async (): Promise<
  IResp<IServiceModel | null>
> => {
  try {
    await dbConnect();

    const service = await Service.findOne(
      {},
      {
        projection: { _id: 0 },
      },
    ).populate({
      path: "employee",
      model: Employee,
    });

    return {
      data: service,
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
