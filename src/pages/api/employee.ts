import { getErrorMessage } from "@/global/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { postEmployee } from "@/global/api/employee-api";

const employeeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const resp = await postEmployee(req.body);
      return res.status(resp.status).json({ data: resp.data });
    } catch (e) {
      const message = getErrorMessage(e);
      return res.status(500).json({
        error: message,
      });
    }
  }
};

export default employeeHandler;
