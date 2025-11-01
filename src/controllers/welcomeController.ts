import type { Request, Response } from "express";

const welcome = async (req: Request, res: Response) => {
  return res.status(200).send("Welcome Kub");
};

export default welcome;
