// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import LoginService from "src/service/LoginService.service";
import Logger from "src/utils/Logger";

// login handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  Logger.log("login api called");
  // Get data submitted in request's body.
  const body = req.body;
  const loginService = new LoginService();
  try {
    const authenticatedUserName = loginService.getAuthenticatedUserName(body);
    Logger.log("authenticatedUserName:", authenticatedUserName);
    res.status(200).json({ user: authenticatedUserName });
  } catch (e) {
    Logger.error("login failed", e);
    return res.status(400).json({ data: "login failed" });
  } finally {
    Logger.log("login api finished");
  }
}
