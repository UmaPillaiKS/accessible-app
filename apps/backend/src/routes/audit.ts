import { Router, Request, Response } from "express";

const router = Router();

router.post("/", (_req: Request, res: Response) => {
  res.json({ message: "audit endpoint — coming soon" });
});

export default router;
