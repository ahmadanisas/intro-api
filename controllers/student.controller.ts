import { Request, Response } from "express";
import fs from "fs"; // Library untuk mengelola file & directory
export const getData = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync("./db.json").toString()); // Membaca file db.json
  res.send(data);
};
