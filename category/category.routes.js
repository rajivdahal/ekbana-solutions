
const router = require('express').Router();
const categorycontroller = require('./category.controller')
// const authenticate=require('./../middlewares/authentication')
router.route('/')
    .get(categorycontroller.get)
    .post(categorycontroller.post)


// router.route('/search')
// .get(categorycontroller.search)
router.route('/:id')
    .put(categorycontroller.put)
    .get(categorycontroller.getByID)
    .delete(categorycontroller.deletedata)

module.exports = router