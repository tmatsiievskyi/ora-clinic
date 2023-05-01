import { Types } from "mongoose";

interface MongoResult {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmployeeModel extends MongoResult {
  firstName: string;
  lastName: string;
  surname: string;
  imgUrl: string;
  position: string;
  index: number;
}

export interface IDiscountModel extends MongoResult {
  title: string;
  description: string;
  discountAmount: number;
  index: number;
}

export interface IServiceModel extends MongoResult {
  label: string;
  description: string;
  shortDescription: string;
  imgUrl: string;
  employee?: Types.ObjectId[];
  subService?: Types.ObjectId[];
}

export enum EGroup {
  male = "MALE",
  female = "FEMALE",
  child = "CHILD",
  mix = "MIX",
}

export interface ISubServiceModel extends MongoResult {
  label: string;
  category: string;
  subCategory?: string;
  outsource: boolean;
  description?: string;
  price: number;
  searchTags?: string[];
}

export interface IComplexModel extends MongoResult {
  label: string;
  imgUrl: string;
  group: EGroup;
  description: string;
  shortDescription: string;
  sale?: number;
  saleFamilyDoctor?: number;
  price?: number;
  priceFamilyDoctor?: number;
  analyses: Types.ObjectId[] | ISubServiceModel;
  examination: Types.ObjectId[];
  consultations: Types.ObjectId[];
  index: number;
}
