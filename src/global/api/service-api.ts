import dbConnect from "./dbConnect";
import Service from "../models/service-model";
import Employee from "../models/employee-model";
import SubService from "../models/subservice-model";
import { IResp } from "./_interfaces";
import { getErrorMessage } from "../utils";
import { IServiceModel } from "../models/_interfaces";

export const getAllService = async (): Promise<
  IResp<IServiceModel[] | null>
> => {
  try {
    await dbConnect();
    const result = await Service.find({
      label: { $nin: ["services.title.complex"] },
    }).sort({ index: 1 });
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

    const service = await Service.findById(id).populate([
      { path: "employee" },
      { path: "subServices", model: SubService },
    ]);

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

    const service = await Service.findOne({ index: 0 }).populate({
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

export const postService = async (
  data: IServiceModel,
): Promise<IResp<IServiceModel | null>> => {
  try {
    await dbConnect();

    const service = await Service.create(data);

    return {
      data: service,
      status: 201,
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
