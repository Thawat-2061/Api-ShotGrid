import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../firebase";

const router = Router();

// GET — All users
router.get("/", async (req, res) => {
  try {
    const snap = await db.collection("users").get();
    const users = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});


// POST — Register new user 
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const docRef = db.collection("users").doc();
    const uid = docRef.id;

    const userData = {
      uid,
      username,
      email,
      password: hashed,

    };

    await docRef.set(userData);

    res.json({
      message: "User created successfully",
      uid
    });

  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST — Get user by UID 
router.post("/UID", async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "UID is required" });
    }

    const doc = await db.collection("users").doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
