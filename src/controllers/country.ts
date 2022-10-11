import { Router } from "express";
import { prisma } from "../index";
// import { hash } from "argon2";
const router = Router();

router.get("/", async (_, res) => {
	res.render("countrys", {
		title: "Countrys",
		countrys: await prisma.country.findMany(),
	});
});

router.get("/create", (_, res) => {
	res.render("country", { title: "Country" });
});

router.post("/create", async (req, res) => {
	const { name, capital, continent, inhabitants, code } = req.body;
	if (!name || !capital || !continent || !inhabitants || !code) {
		res.status(400).json({ message: "Please fill in all fields" });
		return;
	}
	try {
		const country = await prisma.country.create({
			data: {
				name,
				capital,
				continent,
				inhabitants: parseInt(inhabitants),
				code,
			},
		});
		console.log(country);
		res.redirect("/country");
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
		console.log(error);
	}
});

router.get("/update/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const country = await prisma.country.findUnique({
			where: { id },
		});
		if (!country) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}
		res.render("country", { title: "Country", country });
	} catch (error) {
		res.status(400).json({ error });
		console.log(error);
	}
});

router.post("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { name, capital, continent, inhabitants, code } = req.body;
	if (!name || !capital || !continent || !inhabitants || !code) {
		res.status(400).json({ message: "Please fill in all fields" });
		return;
	}
	try {
		const country = await prisma.country.update({
			where: { id },
			data: {
				name,
				capital,
				continent,
				inhabitants: parseInt(inhabitants),
				code,
			},
		});
		if (!country) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}
		res.redirect("/country");
	} catch (error) {
		res.status(400).json({ error });
		console.log(error);
	}
});

router.get("/delete/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const country = await prisma.country.delete({
			where: { id },
		});
		if (!country) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}
		res.redirect("/country");
	} catch (error) {
		res.status(400).json({ error });
		console.log(error);
	}
});

export default router;
