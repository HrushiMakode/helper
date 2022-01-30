import express from "express";
import github from './router/github';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/github',github)

app.get('/',(req,res)=>{
	return res.send({
		Welcome:'Hruhsikesh'
	});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started at port http://localhost:${PORT}`);
});