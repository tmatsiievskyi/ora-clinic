import { IDiscountModel } from "../models/_interfaces";
import dbConnect from "./dbConnect";
import { IResp } from "./_interfaces";
import Discount from "../models/discount-model";
import { getErrorMessage } from "../utils";

export const postDiscount = async (
  data: IDiscountModel,
): Promise<IResp<IDiscountModel | null>> => {
  try {
    await dbConnect();
    const discount = await Discount.create(data);
    return {
      data: discount,
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

export const getAllDiscounts = async (): Promise<
  IResp<IDiscountModel[] | null>
> => {
  try {
    await dbConnect();
    const discounts = await Discount.find({}).sort({ index: 1 });
    return {
      data: discounts,
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
