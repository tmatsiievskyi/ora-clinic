import { getErrorMessage } from "@/global/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  findAllWithOptions,
  postSubService,
} from "@/global/api/subservice-api";

const subServiceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await findAllWithOptions(req.query);
      res.status(200).json(result);
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
