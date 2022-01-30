import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	return res.send({
		Welcome: "Hrushikesh",
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started at port http://localhost:${PORT}`);
});
