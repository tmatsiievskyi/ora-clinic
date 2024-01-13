import dbConnect from "./dbConnect";
import Complex from "../models/complex-model";
import SubService from "../models/subservice-model";
import { IGroupedEmployees, IResp } from "./_interfaces";
import { getErrorMessage } from "../utils";
import { IComplexModel } from "../models/_interfaces";

export const getAllComplexes = async (): Promise<
  IResp<IComplexModel[] | null>
> => {
  try {
    await dbConnect();

    const complexes = await Complex.find({}).sort({ index: 1 });
    return {
      data: complexes,
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

export const getComplexGroups = async (): Promise<IResp<string[] | null>> => {
  try {
    await dbConnect();
    const groups = await Complex.distinct("group");
    return {
      data: groups,
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

export const getComplexByGroup = async (
  group: string | string[],
): Promise<IResp<IComplexModel[] | null>> => {
  try {
    await dbConnect();

    const complexes = await Complex.find({ group }).sort({ index: 1 });

    return {
      data: complexes,
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

export const getComplexById = async (
  id: string | string[],
): Promise<IResp<IComplexModel | null>> => {
  try {
    await dbConnect();

    const complex = await Complex.findById({ _id: id })
      .populate({
        path: "analyses",
        model: SubService,
      })
      .populate({
        path: "examination",
        model: SubService,
      })
      .populate({
        path: "consultations",
        model: SubService,
      });

    return {
      data: complex,
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

export const postComplex = async (
  data: IComplexModel,
): Promise<IResp<IComplexModel | null>> => {
  try {
    await dbConnect();

    const complex = await Complex.create(data);

    return {
      data: complex,
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
