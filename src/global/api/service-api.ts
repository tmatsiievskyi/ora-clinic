import dbConnect from "./dbConnect";
import Service from "../models/service-model";
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
