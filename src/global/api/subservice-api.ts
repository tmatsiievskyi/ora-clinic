import dbConnect from "./dbConnect";
import SubService from "../models/subservice-model";
import Localization from "../models/localization-model";
import {
  IFindAllSubservices,
  IGroupedSubService,
  IResp,
  TFilterQuery,
} from "./_interfaces";
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

export const findAllWithOptions = async (reqData: IFindAllSubservices) => {
  const {
    search,
    page = "1",
    limit = "10",
    sortField = "serviceName",
    sortOrder = "asc",
    lng = "uk-UA",
  } = reqData;

  try {
    await dbConnect();

    let query: TFilterQuery<ISubServiceModel> = {
      $nor: [
        { category: "сonsultations" },
        { category: "analyses" },
        { category: "examination" },
        { archived: true },
      ],
    };
    if (search) {
      // const localizations = await Localization.find({
      //   lng,
      //   value: { $regex: search, $options: "i" },
      // });

      const localizations = await Localization.aggregate([
        {
          $match: {
            value: { $regex: search, $options: "i" },
          },
        },
        { $unwind: "$value" },
        {
          $match: {
            value: { $regex: search, $options: "i" },
          },
        },
        {
          $group: {
            _id: "$_id",
            lng: { $first: "$lng" },
            value: { $push: "$value" },
            key: { $first: "$key" },
          },
        },
      ]);

      const keys = localizations.map((loc) => loc.key);
      query = {
        ...query,
        $or: [
          { label: { $in: keys } },
          { serviceName: { $in: keys } },
          { subCategory: { $in: keys } },
          { searchTags: { $in: keys } },
        ],
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrd = sortOrder === "asc" ? 1 : -1;
    const sort: Record<any, any> = {
      serviceName: 1,
      [sortField]: sortOrd,
      index: 1,
    };

    const data = await SubService.find(query)
      .skip(skip)
      .sort(sort)
      .limit(parseInt(limit))
      .lean();
    const total = await SubService.countDocuments(query);

    const serviceNameKeys = [...new Set(data.map((subs) => subs.serviceName))];
    const groupedSubservices = serviceNameKeys.reduce((acc, serviceName) => {
      const itemsByServiceName = data.filter(
        (item) => item.serviceName === serviceName,
      );

      const itemsBySubCategory = itemsByServiceName.reduce(
        (acc, subService) => {
          const subCategoryKey = subService.subCategory
            ? subService.subCategory
            : "base";

          if (!acc[subCategoryKey]) {
            acc[subCategoryKey] = [];
          }

          acc[subCategoryKey].push(subService);

          return acc;
        },
        {},
      );

      acc[serviceName] = itemsBySubCategory;
      return acc;
    }, {} as Record<string, ISubServiceModel[]>);

    return {
      data: groupedSubservices,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    };
  } catch (e) {
    console.log(e);
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
            $nin: ["сonsultations", "analyses", "examination"],
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
