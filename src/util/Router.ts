// Import node modules
import { Application } from "express";
import { cwd } from "process";
import fs from "fs";

// Import all utils and middlewares from ./utils and ./middlewares
import Queue from "./Queue";

class Router {
	private static instance: Router;
	private static root = cwd();
	private static fs = fs;

	private routers: Queue;

	// Singleton pattern to make sure there is only one instance of the Router class
	public static getInstance(): Router {
		if (!Router.instance) {
			Router.instance = new Router();
		}
		return Router.instance;
	}

	// Constructor to initialize all variables
	private constructor() {
		this.routers = new Queue();
	}

	// Locate all routers in the routes folder
	public locateRouters(path: string) {
		Router.fs
			.readdirSync(path)
			.filter((file: string) => !file.endsWith(".map"))
			.forEach((file: string) => {
				if (Router.fs.lstatSync(path + "/" + file).isDirectory()) {
					this.locateRouters(path + "/" + file);
				} else {
					const dir = `${path}/${file}`;
					console.log();
					this.routers.enqueue({
						router: require(dir).default,
						route: dir
							.replace(Router.root + "/dist/routes", "")
							.replace(".js", "")
							.replace("/index", "/"),
						root: Router.root + "/dist/routes",
					});
				}
			});
	}

	// Use all routers in the routes queue
	public useRouters(
		app: Application,
		path = Router.root + "/dist/routes"
	): void {
		this.locateRouters(path);
		this.routers.forEach(route => {
			app.use(route.route, route.router);
		});
	}

	// Get all routes from the routes queue
	public get routes(): Queue {
		return this.routers;
	}
}

export default Router;
