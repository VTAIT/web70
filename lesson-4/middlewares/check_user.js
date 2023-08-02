import { users } from "../data/user.js";

export const check_user = (req, res, next) => {
    const body = req.body;

    const user = users.find(e => {
        return e.username === body["username"] && e.password === body["password"]
    });

    if (!user) {
        return res.send({
            message: "username hoặc password không đúng",
            apiKey: ""
        })
    }

    req.apiKey = user.apiKey

    next();
}