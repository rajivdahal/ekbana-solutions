// const UserModel=require('./../models/user.model')
const companyQuery = require("./company.querry")
const fs=require("fs")
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
    companyQuery.find(data)
        .then(function (response) {
            res.send(response)
        })
        .catch(function (err) {
            next(err)
        })
}
function findbyId(req, res, next) {
    let id=req.params.id
    let condition = {_id:id}
    companyQuery.find(condition)
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
    if (req.files && req.files.length) {
        data.image = req.files.map(function (item) {
            return item.filename
        })
    }
    companyQuery.post(data)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            next(err)
        })
}
function put(req, res, next) {

    const data = {
        data: req.body,
        id: req.params.id
    }
    if (req.files && req.files.length) {
        data.data.newimage = req.files.map(function (item) {
            return item.filename
        })
    }

    companyQuery.update(data)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            next(err)
        })
}
function deletedata(req, res, next) {
    let id = req.params.id
    companyQuery.remove(id)
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
    findbyId,
}