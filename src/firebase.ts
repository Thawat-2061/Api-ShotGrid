import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../serviceAccountKey.json"; // โหลดจาก Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  storageBucket: "your-project-id.appspot.com",
});

export const db = getFirestore();
export const bucket = admin.storage().bucket();
