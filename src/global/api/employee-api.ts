import dbConnect from "./dbConnect";
import Employee from "../models/employee-model";
import { IGroupedEmployees, IResp } from "./_interfaces";
import { getErrorMessage } from "../utils";
import { IEmployeeModel } from "../models/_interfaces";

export const getAllEmployees = async (): Promise<
  IResp<IEmployeeModel[] | null>
> => {
  try {
    await dbConnect();
    const employees = await Employee.find({});
    return {
      data: employees,
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

export const getEmployeeDepartments = async (): Promise<
  IResp<string[] | null>
> => {
  try {
    await dbConnect();

    const groups = await Employee.distinct("department");
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

export const getEmployeesByDepartment = async (
  department: string | string[],
): Promise<IResp<IEmployeeModel[] | null>> => {
  try {
    await dbConnect();

    const employees = await Employee.find({ department }).sort({ index: 1 });

    return {
      data: employees,
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

export const getEmployeeById = async (
  id: string | string[],
): Promise<IResp<IEmployeeModel | null>> => {
  try {
    await dbConnect();

    const employee = await Employee.findById(id);

    return {
      data: employee,
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

export const getFirstEmployee = async (): Promise<
  IResp<IEmployeeModel | null>
> => {
  try {
    await dbConnect();

    const employee = await Employee.findOne(
      {},
      {
        projection: { _id: 0, emailVerified: 0 },
      },
    );

    return {
      data: employee,
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

export const getGroupedEmployee = async (): Promise<
  IResp<IGroupedEmployees[] | null>
> => {
  try {
    await dbConnect();

    const employee = await Employee.aggregate([
      {
        $group: { _id: "$department", data: { $push: "$$ROOT" } },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return {
      data: employee,
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

export const postEmployee = async (
  data: IEmployeeModel,
): Promise<IResp<IEmployeeModel | null>> => {
  try {
    await dbConnect();

    const employee = await Employee.create(data);

    return {
      data: employee,
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
