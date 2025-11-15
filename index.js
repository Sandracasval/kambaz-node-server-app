//const express = require('express') //equivalent to import

import "dotenv/config";
import session from "express-session";
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";

const app = express();
//pass a reference to the database for each of the routes
//CONFIGURE THE CORS TO SUPPORT COOKIES AND RESTRICT NETWORK ACCESS TO ONLY COME
//FROM THE REACT APPLICATION AS SHOWN BELOW
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
//create a new express instance and assignmet to the local constant app
//Hello is the function from the Hello.js file
//THESE ARE THE DIFFERENT ROUTES
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
