import dbConnect from "./dbConnect";
import SubService from "../models/subservice-model";
import { IGroupedSubService, IResp } from "./_interfaces";
import { getErrorMessage } from "../utils";
import { ISubServiceModel } from "../models/_interfaces";

export const getAllSubService = async (): Promise<
  IResp<ISubServiceModel[] | null>
> => {
  try {
    await dbConnect();
    const result = await SubService.find({}).sort({ index: 1 });
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

export const getSubServiceById = async (
  id: string | string[],
): Promise<IResp<ISubServiceModel | null>> => {
  try {
    await dbConnect();

    const subService = await SubService.findById(id);

    return {
      data: subService,
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

export const getFirstSubService = async (): Promise<
  IResp<ISubServiceModel | null>
> => {
  try {
    await dbConnect();

    const subService = await SubService.findOne(
      {},
      {
        projection: { _id: 0 },
      },
    );

    return {
      data: subService,
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

export const getGroupedSubService = async (): Promise<
  IResp<IGroupedSubService[] | null>
> => {
  try {
    await dbConnect();

    const result = await SubService.aggregate([
      {
        $sort: {
          index: 1,
        },
      },
      {
        $match: {
          category: {
            $nin: ["сonsultations", "analyses"],
          },
        },
      },
      {
        $group: { _id: "$category", data: { $push: "$$ROOT" } },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return {
      data: result,
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

export const postSubService = async (
  data: ISubServiceModel,
): Promise<IResp<ISubServiceModel | null>> => {
  try {
    await dbConnect();

    const subService = await SubService.create(data);

    return {
      data: subService,
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
