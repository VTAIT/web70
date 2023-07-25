import express from "express";
import crypto from 'crypto';

const app = express();
const port = 5001;
app.use(express.json());

const modelTodo = {
    id: "defineId",
    todoName: "defineTodoName",
    date: "24/07/2023",
    status: "PENDING",
}

const todoList = [
    {
        id: "74d2e282-3229-44de-bb90-9f4d15354f04",
        todoName: "Làm gì đó 1",
        date: "24/07/2023",
        status: "PENDING",
    },
    {
        id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        todoName: "Làm gì đó 2",
        date: "23/07/2023",
        status: "TODO",
    },
    {
        id: "36128291-709e-466f-8567-966deae2f1b2",
        todoName: "Làm gì đó 3",
        date: "22/07/2023",
        status: "DOING",
    },
    {
        id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
        todoName: "Làm gì đó 4",
        date: "21/07/2023",
        status: "DONE",
    },
];

const users = [
    {
        id: "74d2e282-3229-44de-bb90-9f4d15354f04",
        username: "vanA",
        fullname: "Nguyen Van A",
        age: 19,
    },
    {
        id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        username: "nguyenvanB",
        fullname: "Nguyen Van B",
        age: 20,
    },
    {
        id: "36128291-709e-466f-8567-966deae2f1b2",
        username: "NVanC",
        fullname: "Nguyen Van C",
        age: 21,
    },
    {
        id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
        username: "VAND",
        fullname: "Nguyen Van D",
        age: 22,
    },
];

app.get('/api/todo-list', (req, res) => {
    const queryParam = req.query;
    let isHas = false;

    // check có chứa fields
    for (const key in queryParam) {
        for (const key1 in modelTodo) {
            if (key === key1) {
                isHas = true;
                break;
            }
        }
        if (isHas) break;
    }

    if (!isHas) {
        return res.send({
            data: todoList,
            message: "Thành công",
            success: true,
        }
        );
    }

    let newTodoList = [];
    todoList.map(e => {
        let newObj = { ...e };
        for (const key in queryParam) {
            const element = queryParam[key];
            if (element === '0') {
                delete newObj[key];
            }
        }
        newTodoList.push(newObj);
    });

    res.send({
        data: newTodoList,
        message: "Thành công",
        success: true,
    }
    );
});

app.get('/api/users', (req, res) => {
    const queryParam = req.query;
    const username = queryParam['username'];
    const sort = queryParam['sort'];

    if (username) {
        const toLowCase = username.toLowerCase();
        const newUserList = users.filter(e => {
            return e.username.toLowerCase().includes(toLowCase);
        });

        return res.send({
            data: newUserList,
            message: "Thành công",
            success: true,
        });
    } else {
        res.send({
            data: users,
            message: "Thành công",
            success: true,
        });
    }

    if (sort) {
        let sortDesc = [];
        if (sort === 'DESC') {
            sortDesc = users.sort((a, b) => b.age - a.age);

        } else if (sort === 'ASC') {
            sortDesc = users.sort((a, b) => b.age - a.age);
        }

        return res.send({
            data: sortDesc,
            message: "Thành công",
            success: true,
        });
    }
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    let dulicate = false;
    users.map(e => {
        if (e.username === body['username']) {
            dulicate = true;
            return res.send({
                data: null,
                message: "Thất bại! User đã tồn tại",
                success: false,
            });
        }
    });

    if (!dulicate) {
        return res.send({
            data: { ...body, id: crypto.randomUUID() },
            message: "Tạo mới user thành công",
            success: true,

        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})