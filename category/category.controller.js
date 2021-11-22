// const UserModel=require('./../models/user.model')
const categoryQuery = require("./category.querry")
function get(req, res, next) {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let data = {
        startIndex:startIndex,
        endIndex:endIndex,
        condition:{},
        page:page,
        limit:limit
    }
    categoryQuery.find(data)
        .then(function (response) {
            res.send(response)
        })
        .catch(function (err) {
            next(err)
        })
}
function getByID(req, res, next) {
    let condition = {_id:req.params.id}
    categoryQuery.find(condition)
        .then(function (response) {
            res.send(response)
        })
        .catch(function (err) {
            next(err)
        })
}

function post(req, res, next) {
    console.log("req.body data is", req.body)
    const data = req.body;
    categoryQuery.post(data)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            next(err)
        })
}
function put(req, res, next) {
    const data ={
        data:req.body,
        id:req.params.id
    }
    categoryQuery.update(data)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            next(err)
        })
}
function deletedata(req, res, next) {
    let id=req.params.id
    categoryQuery.remove(id)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            next(err)
        })
}
module.exports = {
    get,
    post,
    put,
    deletedata,
    getByID
}