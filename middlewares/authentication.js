const authenticate=function(req,res,next){
    const API_KEY=JSON.stringify(req.headers['API_KEY'])
    console.log(API_KEY)
    if(API_KEY){
       return next()
    }
    if(!API_KEY){
        return next({
            msg:"please Enter API Key to continue",
            status:400
        })
    }
    next("please enter valid api key")
}
module.exports=authenticate