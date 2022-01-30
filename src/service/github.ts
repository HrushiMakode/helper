import axios from "axios";
import { config } from "dotenv";
config()

axios.defaults.headers.common = {
	Accept: "application/vnd.github.v3+json",
	Authorization: process.env.AUTH_TOKEN as string,
};

export class Github {
	fetch = async (url: string) => {
		return (await axios.get(url)).data;
	};

	getUser = async (username: string) => {
		const res = await this.fetch(`https://api.github.com/users/${username}`);
		return res;
	};

	getRepos = async (repos_url: string) => {
		const repos: any[] = await this.fetch(repos_url);
		const languagesUrls = repos.map((repo) => {
			return { name: repo.name, url: repo.languages_url };
		});
		let languagesData = await Promise.all(
			languagesUrls.map(async ({ name, url }) => {
				return { repo: name, languages: await this.fetch(url) };
			})
		);
		languagesData = languagesData
			.map((data) => {
				return {
					repo: data.repo,
					languages: getPercentage(data.languages),
				};
			})
			.filter((data) => data.languages !== {});
		return languagesData;
	};
}

const getPercentage = (obj: any) => {
	const arg: any = {};
	const total = Object.values(obj).reduce((prev: any, total) => prev + total, 0);
	for (const [key, value] of Object.entries(obj)) {
		arg[key] = ((<number>value * 100) / <number>total).toFixed(2);
	}
	return arg;
};

export default new Github();
