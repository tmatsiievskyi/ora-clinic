import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/global/api/dbConnect";
import { getErrorMessage } from "@/global/utils";
import { postDiscount } from "@/global/api/discount-api";

const discountHandle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        await dbConnect();
        const resp = await postDiscount(req.body);
        return res
          .status(resp.status)
          .json({ data: resp.data, success: resp.success });
      } catch (e) {
        const message = getErrorMessage(e);
        return res.status(500).json({
          error: message,
        });
      }
    default:
      res.status(400).json({ error: "Method is not allowed" });
      break;
  }
};

export default discountHandle;
