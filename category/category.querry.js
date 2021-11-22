const categoryModel = require('./category.model')

function map_category(data, model) {
    console.log("inside mapper")
    if (data.title)
        model.title = data.title
}

function find(data) {
    return new Promise(function (resolve, reject) {
        console.log("inside querry")
        const result = {}
        categoryModel.find({})
        .then(done=>{
            if (data.endIndex < done.length) {
                result.next = {
                    page: data.page + 1,
                    limit: data.limit,
                }
            }
            if (data.startIndex > 0) {
                result.previous = {
                    page: data.page - 1,
                    limit: data.limit
                }
            }
        })
        .catch(err=>{
            reject(err)
        })
        categoryModel.find(data.condition)
            .sort({
                _id: -1
            })
            .limit(data.limit)
            .skip(data.startIndex)
            .exec(function (err, done) {
                if (err) {
                    return reject(err)
                }
                result.result = done
            console.log("result is",result)

                resolve(result)
            })
    })
}
function post(data) {
    return new Promise(function (resolve, reject) {
        const newCategory = new categoryModel
        map_category(data, newCategory)
        newCategory.save(function (err, done) {
            if (err) {
                console.log("inside err")
                return reject(err)
            }
            console.log("inside done",done)
            resolve(done)
        })
    })
}

function update(data) {
    return new Promise(function (resolve, reject) {
        categoryModel.findById(data.id, function (err, done) {
            if (err) {
                return reject(err)
            }
            if (!done) {
                return reject("category not found")
            }
            map_category(data.data, done)
            
            done.save(function (err, done) {
                if (err) {
                    return reject(err)
                }
                return resolve(done)
            })
        })

    })
}

function remove(data) {
    return new Promise(function (resolve, reject) {
        categoryModel.findByIdAndRemove(data, function (err, done) {
            if (err) {
                return reject(err)
            }
            if(!done){
                return reject("category not found")
            }
            resolve(done)
        })
    })
}
module.exports = {
    find,
    post,
    update,
    remove
}
