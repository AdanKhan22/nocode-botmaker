import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "app", "data", "bot-config.json");


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
  
    try {
      const data = fs.readFileSync(filePath, "utf8");
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read bot config" });
    }
  } 
  else if (req.method === "POST") {
    
    try {
      const newConfig = req.body;
      fs.writeFileSync(filePath, JSON.stringify(newConfig, null, 2));
      res.status(200).json({ message: "Bot config updated successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update bot config" });
    }
  } 
  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
