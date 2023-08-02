import { Router } from "express";
import { users } from "../data/user.js";
import { check_register } from "../middlewares/check_register.js";

const route = Router();

route.post('/', check_register, (req, res) => {
    res.send({
        message: "Đăng ký thành công",
        apiKey: `${req.body['username']}.${req.body['password']}`
    })
});


export default route;