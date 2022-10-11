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

// create applicant
router.post("/create", async (req, res) => {
	// get data from form
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

	// check if every field is filled in
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
		!zipCode ||
		!place ||
		!applicantkey
	) {
		res.status(400).json({ message: "Please fill in all fields" });
		return;
	}

	try {
		// create applicant
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

		// if creation is unsuccessful redirect to create page
		if (!applicant) {
			// res.status(400).json({ message: "Something went wrong" });
			res.redirect("/applicant/create");
			return;
		}

		// redirect to applicant page
		res.redirect("/applicant");
	} catch (error) {
		// if creation is unsuccessful redirect to create page
		res.redirect("/applicant/create");

		// log error
		console.log(error);
	}
});

// update applicant page
router.get("/update/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const applicant = await prisma.applicant.findUnique({
			where: { id },
		});
		if (!applicant) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}
		res.render("applicant-update", { title: "applicant", data: applicant });
	} catch (error) {
		res.status(400).json({ error });
		res.redirect("/applicant");
		console.log(error);
	}
});

// update Route
router.post("/update/:id", async (req, res) => {
	// gettting the id from the url
	const { id } = req.params;

	// getting all the data from the post request body
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

	// checking if all the fields are filled in
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
		!zipCode ||
		!place ||
		!applicantkey
	) {
		res.status(400).json({ message: "Please fill in all fields" });
		return;
	}

	// updating the applicant
	// if the applicant is not found it will throw an error
	try {
		// updating the applicant
		const applicant = await prisma.applicant.update({
			where: { id },
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

		// if the applicant is not found it will throw an error and return
		if (!applicant) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}

		// redirecting to the applicant page if everything went well
		res.redirect("/applicant");
	} catch (error) {
		// if there is an error it will return the error
		res.status(400).json({ error });
		console.log(error);
	}
});

// delete Route
router.get("/delete/:id", async (req, res) => {
	// getting the id from the url
	const { id } = req.params;

	try {
		// deleting the applicant
		const applicant = await prisma.applicant.delete({
			where: { id },
		});

		// if the applicant is not found it will throw an error and return
		if (!applicant) {
			res.status(400).json({ message: "Something went wrong" });
			return;
		}

		// redirecting to the applicant page if everything went well
		res.redirect("/applicant");
	} catch (error) {
		// if there is an error it will return the error
		res.status(400).json({ error });
		console.log(error);
	}
});

export default router;

