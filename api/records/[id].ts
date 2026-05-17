import type { VercelRequest, VercelResponse } from "@vercel/node";
import { deleteRecord } from "../_store.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) {
    res.status(400).json({ error: "Missing record id" });
    return;
  }

  deleteRecord(id);
  res.status(200).json({ success: true });
}
