const express=require('express')
const router=express.Router()
const categoryrouter=require('./../category/category.routes')
const companyrouter=require('./../company/company.routes')


router.use('/category',categoryrouter)
router.use('/company',companyrouter)
module.exports=router;