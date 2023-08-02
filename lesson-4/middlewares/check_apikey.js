import { users } from "../data/user.js";

export const check_apikey = (req, res, next) => {
    const apiKey = req.query['apiKey'];
    let isValidate_apiKey = false;

    if (apiKey) {
        const user = users.find(e => {
            return e.apiKey === apiKey
        });
        if (user) {
            req.userId = user.id
            isValidate_apiKey = true;
        }
    }


    if (!isValidate_apiKey) {
        return res.send({
            message: "Không được phép",
        });
    }

    next()
}