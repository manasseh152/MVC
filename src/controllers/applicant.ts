import { Router } from "express";
import { prisma } from "../index";
const router = Router();

router.get("/", async (_, res) => {
	res.render("applicant", {
		title: "applicant",
		applicant: await prisma.applicant.findMany(),
	});
});

router.get("/create", (_, res) => {
	res.render("applicant-create", { title: "applicant" });
});

router.post("/create", async (req, res) => {
	// {"applicantNumber":"333161","gender":"Man","title":"Student","firstName":"manasseh","lastName":"stam","nickName":"manasseh","birthDate":"2022-10-05T16:33","street":"Rivierdijk","number":"656","numberExtension":"+31","zipCode":"3371EG","place":"Hardinxveld-Gissendam","applicantkey":"333161","description":"yes sir"}
	const {
		applicantNumber,
		gender,
		title,
		firstName,
		lastName,
		nickName,
		birthDate,
		street,
		number,
		numberExtension,
		zipCode,
		place,
		applicantkey,
		description,
	} = req.body;
	if (
		!applicantNumber ||
		!gender ||
		!title ||
		!firstName ||
		!lastName ||
		!nickName ||
		!birthDate ||
		!street ||
		!number ||
		!numberExtension ||
		!zipCode ||
		!place ||
		!applicantkey ||
		!description
	) {
		res.status(400).json({ message: "Please fill in all fields" });
		return;
	}
	try {
		const applicant = await prisma.applicant.create({
			data: {
				applicantNumber,
				gender,
				title,
				firstName,
				lastName,
				nickName,
				birthDate,
				street,
				number,
				numberExtension,
				zipCode,
				place,
				applicantkey,
				description,
			},
		});
		if (!applicant) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}
		res.redirect("/applicant");
	} catch (error) {
		res.status(400).json({ error });
		console.log(error);
	}
});

router.get("/update/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const applicant = await prisma.applicant.findUnique({
			where: { id: parseInt(id) },
		});
		if (!applicant) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}
		res.render("applicant-update", { title: "applicant", data: applicant });
	} catch (error) {
		res.status(400).json({ error });
		console.log(error);
	}
});

router.post("/update/:id", async (req, res) => {
	const { id } = req.params;
	const {
		applicantNumber,
		gender,
		title,
		firstName,
		lastName,
		nickName,
		birthDate,
		street,
		number,
		numberExtension,
		zipCode,
		place,
		applicantkey,
		description,
	} = req.body;
	if (
		!applicantNumber ||
		!gender ||
		!title ||
		!firstName ||
		!lastName ||
		!nickName ||
		!birthDate ||
		!street ||
		!number ||
		!numberExtension ||
		!zipCode ||
		!place ||
		!applicantkey ||
		!description
	) {
		res.status(400).json({ message: "Please fill in all fields" });
		return;
	}
	try {
		const applicant = await prisma.applicant.update({
			where: { id: parseInt(id) },
			data: {
				applicantNumber,
				gender,
				title,
				firstName,
				lastName,
				nickName,
				birthDate,
				street,
				number,
				numberExtension,
				zipCode,
				place,
				applicantkey,
				description,
			},
		});
		if (!applicant) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}
		res.redirect("/applicant");
	} catch (error) {
		res.status(400).json({ error });
		console.log(error);
	}
});

router.get("/delete/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const applicant = await prisma.applicant.delete({
			where: { id: parseInt(id) },
		});
		if (!applicant) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}
		res.redirect("/applicant");
	} catch (error) {
		res.status(400).json({ error });
		console.log(error);
	}
});

export default router;
