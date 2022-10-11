import { Router } from "express";
const router = Router();

router.get("/", (_, res) => {
	res.render("index", { title: "Express" });
});

router.post("/", (req, res) => {
	res.json(req.body);
});

export default router;
