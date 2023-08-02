import { Router } from "express";
import { check_apikey } from "../middlewares/check_apikey.js";
import { posts } from '../data/posts.js'

const route = Router();

let viewer = []

route.get('/:id', check_apikey, (req, res) => {
    const { id } = req.params;
    const post = posts.find(e => {
        return e.id === id
    })

    viewer.push(req.userId);

    res.send({
        ...post,
        viewer
    })
});


export default route;