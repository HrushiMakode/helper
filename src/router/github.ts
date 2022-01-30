import { Router } from "express";
import { User } from "../models/user/user";
import Github from "../service/github";
const router = Router();

router.get("/", (req, res) => {
	return res.send({
		Github: "Welcome to your github api Hrushikesh",
	});
});

router.get("/users/:username", async (req, res) => {
	const username = req.params.username;
	const user = await Github.getUser(username);
	const newUser: User = {
		name: user.name,
		bio: user.bio,
		repo_url: user.repo_url,
		username: user.login,
	};
	return res.send({ user: newUser, data: user });
});

router.get("/users/:username/repos", async (req, res) => {
	const username = req.params.username;
	const user = await Github.getUser(username);
	const repos_url = user.repos_url;
	const repos = await Github.getRepos(repos_url);
	return res.send(repos);
});

export default router;
