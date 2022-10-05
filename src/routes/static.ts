import express, { Router } from "express";
import { cwd } from "process";

const router = Router();
const rootDir = cwd();

router.use(express.static(`${rootDir}/public`));

export default router;
