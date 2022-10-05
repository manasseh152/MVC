import { Router } from "express";
import { verify, hash } from "argon2";

import { prisma } from "../index";

const router = Router();

router.get("/", (_, res) => {
	res.render("home");
});

// login
router.get("/login", (_, res) => {
	res.render("login");
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.render("login", {
			error: "Please fill in all fields",
		});
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			return res.render("login", {
				error: "Invalid credentials",
			});
		}

		const valid = await verify(user.password, password);

		if (!valid) {
			return res.render("login", {
				error: "Invalid credentials",
			});
		}

		req.session.user = {
			id: user.id,
			fullname: user.fullname,
			email: user.email,
			role: user.role,
		};

		return res.redirect("/");
	} catch (error) {
		return res.render("login", {
			error: "Something went wrong",
		});
	}
});

// register
router.get("/register", (_, res) => {
	res.render("register");
});

router.post("/register", async (req, res) => {
	const { fullname, email, password } = req.body;

	if (!fullname || !email || !password) {
		return res.render("register", {
			error: "Please fill in all fields",
		});
	}

	try {
		const hashedPassword = await hash(password);

		const user = await prisma.user.create({
			data: {
				fullname: fullname,
				email: email,
				password: hashedPassword,
			},
		});

		req.session.user = {
			id: user.id,
			fullname: user.fullname,
			email: user.email,
			role: user.role,
		};

		return res.redirect("/");
	} catch (error) {
		return res.render("register", {
			error: "Something went wrong",
		});
	}
});

// me
router.get("/me", (req, res) => {
	if (!req.session.user) {
		return res.redirect("/login");
	}

	return res.json(req.session.user);
});

export default router;
