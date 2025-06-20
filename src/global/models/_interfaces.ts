import { Types, Schema } from "mongoose";

interface MongoResult {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum EDepartment {
  allergist = "allergist",
  gynecologist = "gynecologist",
  surgeon = "surgeon",
  dermatologist = "dermatologist",
  endocrinologist = "endocrinologist",
  gastro = "gastro",
  cardiologist = "cardiologist",
  usd = "usd",
  ent = "ent",
  neurologist = "neurologist",
  ophthalmologist = "ophthalmologist",
  psychotherapist = "psychotherapist",
  familyDoc = "familyDoc",
  dentist = "dentist",
  urologist = "urologist",
}

export interface IEmployeeModel extends MongoResult {
  firstName: string;
  lastName: string;
  surname: string;
  imgUrl: string;
  smImgUrl: string;
  position: string;
  department: string;
  index: number;
  illness?: string[];
  achievements?: string[];
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
  employee?: Types.ObjectId[] | IEmployeeModel[];
  subServices?: Schema.Types.ObjectId[] | ISubServiceModel[];
  mainItems?: string[];
  name: string;
  index: number;
}

export enum EGroup {
  male = "MALE",
  female = "FEMALE",
  CHILDREN = "children",
  mix = "MIX",
}

export interface ISubServiceModel extends MongoResult {
  label: string;
  category: string;
  subCategory?: string;
  service?: Schema.Types.ObjectId[] | IServiceModel[];
  serviceName: string;
  outsource: boolean;
  description?: string;
  price: number;
  pricePrefix?: string;
  priceSuffix?: string;
  archived?: boolean;
  searchTags?: string[];
  index: number;
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
  analyses: any;
  examination: any;
  consultations: any;
  items?: {
    label: string;
    price: number;
    priceFamilyDoctor: number;
    services: {
      label: string;
    }[];
  }[];
  // analyses: Types.ObjectId[] | ISubServiceModel[];
  // examination: Types.ObjectId[] | ISubServiceModel[];
  // consultations: Types.ObjectId[];
  index: number;
}

export interface ILocalModel extends MongoResult {
  lng: string;
  key: string;
  value: string;
}
