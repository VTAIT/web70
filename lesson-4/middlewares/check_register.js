import { users } from "../data/user.js";

export const check_register = (req, res, next) => {
    const body = req.body;

    const username = body["username"];
    const password = body["password"];

    if (!username){
        return res.send({
            message: "username là bắt buộc"
        })
    }

    if (!password){
        return res.send({
            message: "password là bắt buộc"
        })
    }

    const user = users.find(e => {
        return e.username === username
    });

    if (user) {
        return res.send({
            message: "username đã tồn tại"
        })
    }

    const regex_user = /^[a-zA-Z0-9]*$/;
    const isValidate_user = regex_user.exec(username);

    if (!isValidate_user){
        return res.send({
            message: "username sai định dạng"
        })
    }

    const regex_char = /^[a-z]{6,}$/;
    const regex_number = /^[0-9]{6,}$/;
    
    if (!regex_char.exec(password) && !regex_number.exec(password)){
        return res.send({
            message: "password sai định dạng"
        })
    }

    next()
}