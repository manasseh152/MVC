// Routes class for the application
// Routes class is a singleton class
// It is used to automatically generate routes for the application
//
// Language: typescript
// Path: src/util/Router.ts

import fs from "fs";
import { cwd } from "process";
import { Application } from "express";

class Routes {
	private static instance: Routes;
	private routes: any[];
	private routers: any[];

	private baseUrl: string;

	private constructor() {
		this.baseUrl = "";
		this.routes = [];
		this.routers = [];
	}

	public static getInstance() {
		if (!Routes.instance) {
			Routes.instance = new Routes();
		}
		return Routes.instance;
	}

	private getRoutes(dir: string) {
		console.log(`[Routes] dir: ${dir}`);
		fs.readdirSync(dir)
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				try {
					const router = require(`${dir}/${file}`).default;
					this.routers.push({
						router: router,
						path: `/${file.replace(".js", "").replace("index", "")}`,
					});
					console.log(`[Routes] ${file} imported`);
				} catch (err) {
					console.log(err);
				}
			});
		console.log(`[Routes] ${this.routers.length} routes imported \n`);
	}

	public getRoutesArry() {
		this.getRoutes(cwd() + "/dist/routes");
		return this.routes;
	}

	public setBaseUrl(url: string) {
		this.baseUrl = url;
	}

	public setRouters(app: Application) {
		console.log(`[Routes] Setting up routes`);
		this.routers.forEach(({ router, path }) => {
			app.use(path, router);
			console.log(`[Routes] url: ${this.baseUrl}${path.replace("/", "")}`);
		});
		console.log(`[Routes] ${this.routers.length} routes set \n`);
	}
}

export default Routes.getInstance();
