import express, { Router } from "express";
const router = Router();

router.use(express.static("public"));

export default router;
