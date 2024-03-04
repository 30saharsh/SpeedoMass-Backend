require("dotenv").config({path:"./.env"});
const express = require("express")
const app = express();

const PORT = process.env.PORT;

const cors = require("cors");
app.use(cors());


require("./Models/database").connectDatabase();

app.use("/files" , express.static("files"))


const logger = require("morgan");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


const session = require("express-session");
const cookieparser = require("cookie-parser")

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET
}))

app.use(cookieparser());

app.use(logger('tiny'));

app.use("/"  , require("./routes/indexRouter"))


app.listen(PORT , console.log(`🔥🔥SpeedoMass Server Running On Port ${PORT}🔥🔥`));