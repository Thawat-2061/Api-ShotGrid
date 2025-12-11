import { Router } from "express";
import { db } from "../firebase";

const router = Router();

// POST /api/upload
router.post("/", async (req, res) => {
  try {
    const { uid, downloadURL, filename } = req.body;

    if (!uid || !downloadURL) {
      return res.status(400).json({ error: "missing fields" });
    }

    const doc = await db.collection("uploads").add({
      uid,
      url: downloadURL,
      filename,
      createdAt: new Date(),
    });

    res.json({ success: true, id: doc.id });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
