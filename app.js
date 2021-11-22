const express=require("express")
const PORT=4000;
const app=express()
const routes=require('./routes/app.routes')
const apiAuthenticate=require('./middlewares/authentication')


require('./db_init')
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())


app.use('/api',apiAuthenticate,routes)
//start of error handling middlewares
app.use(function(req,res,next){
    next({
        msg:"endpoint not found",
        status:404
    })
})
app.use(function(err, req, res, next){
    res.status(err.status || 400)
    res.json({
        msg:err
    })
})
//end of error handling middlewares



app.listen(PORT,function(err,done){
    if(err){
        return console.log("error in listening>>",PORT)
    }
    console.log("server listening at port>",PORT)
    console.log("precc CTRL+C to exit")
})