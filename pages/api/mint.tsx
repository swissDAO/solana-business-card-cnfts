import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import Irys from "@irys/sdk";
export type MakeTransactionInputData = {
  account: string;
};

export type MakeTransactionOutputData = {
  transaction: string;
  message: string;
};
const sharp = require("sharp");
const fs = require("fs");

async function post(req: NextApiRequest, res: NextApiResponse) {}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {}
