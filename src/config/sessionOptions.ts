// Import all node modules
import { SessionOptions } from "express-session";
// import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { Role } from "@prisma/client";

// Export session options as a function
export default function sessionOptions(
	// store: PrismaSessionStore,
	secret: string,
	prod: boolean
): SessionOptions {
	return {
		secret: secret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
			secure: prod,
			sameSite: "lax",
		},
		// store: store,
	};
}

declare module "express-session" {
	interface SessionData {
		user: {
			id: string;
			fullname: string;
			email: string;
			role: Role;
		};
	}
}
