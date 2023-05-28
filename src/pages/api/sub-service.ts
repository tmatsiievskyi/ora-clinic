import dbConnect from "@/global/api/dbConnect";
import { getErrorMessage } from "@/global/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import SubService from "@/global/models/subservice-model";
import { postSubService } from "@/global/api/subservice-api";

const subServiceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const query = (req.query.query as string)?.split(" ");
      const regex = query.map((e) => {
        return new RegExp(e, "i");
      });
      const result = await SubService.aggregate([
        {
          $match: { searchTags: { $in: regex } },
        },
        {
          $group: {
            _id: "$category",
            data: { $push: "$$ROOT" },
          },
        },
      ]);
      res.status(200).send(result);
    } catch (e) {
      const message = getErrorMessage(e);
      return res.status(500).json({
        error: message,
      });
    }
  }
  if (req.method === "POST") {
    try {
      const resp = await postSubService(req.body);
      return res.status(resp.status).json({ data: resp.data });
    } catch (e) {
      const message = getErrorMessage(e);
      return res.status(500).json({
        error: message,
      });
    }
  }
};

export default subServiceHandler;
