import { Router } from "express";
import { check_user } from "../middlewares/check_user.js";

const route = Router();

route.post('/', check_user, (req, res) => {
    res.send({
        message: "Đăng nhập thành công",
        apiKey: req.apiKey
    })
});


export default route;