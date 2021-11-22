
const router = require('express').Router();
const companycontroller = require('./company.controller')
const upload = require('./../middlewares/uploader')('image')

router.route('/')
    .get(companycontroller.get)
    .post(upload.array("image"), companycontroller.post)


// router.route('/search')
//     .get(companycontroller.search)
//     .post(companycontroller.search)
router.route('/:id')
    .get(companycontroller.findbyId)
    .put(upload.array("image"), companycontroller.put)
    .delete(companycontroller.deletedata)

module.exports = router