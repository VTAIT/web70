import { Router } from "express";
import login from "./login.js";
import posts from "./posts.js";
import register from './register.js'

const route = Router();

route.use('/auth/login', login);
route.use('/auth/register', register);
route.use('/posts', posts);

export default route;