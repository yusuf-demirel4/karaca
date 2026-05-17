import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ReflectionRecord } from "../src/types";
import { getRecords, addRecord, deleteRecord } from "./_store";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    res.status(200).json(getRecords());
    return;
  }

  if (req.method === "POST") {
    const { record } = req.body ?? {};
    if (!record || !record.id) {
      res.status(400).json({ error: "Invalid record data" });
      return;
    }
    addRecord(record as ReflectionRecord);
    res.status(200).json({ success: true, record });
    return;
  }

  if (req.method === "DELETE") {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    if (!id) {
      res.status(400).json({ error: "Missing record id" });
      return;
    }
    deleteRecord(id);
    res.status(200).json({ success: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
