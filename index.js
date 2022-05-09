import express from 'express';
import bodyParser from "body-parser";
import { connectDb } from "./src/database/index.js";
import * as path from "path";
import cors from "cors";
import authRouter from './src/routes/auth.js';
/* API Instance */
const app = express();

/* API Connect Info */
const port = 3001;
const host = "localhost";

/* Connect to database */
connectDb();

const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(cors());


/*app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});*/

/* Adding routers */
app.use('/api/auth',authRouter);
/*app.use('/api/user',userRouter);
app.use('/api/post',postRouter);*/

app.get('/',function (req,res){
    res.sendFile(__dirname+'/src/html/index.html');
});


app.listen(port,host,() => {
    console.log("efetemel.com api started.");
    console.log(`efetemel.com api homepage: http://${host}:${port}`);
});