const companyModel = require('./company.model')
const path = require("path")
const fs = require("fs")

function map_company(data, model) {
    console.log("inside mapper")
    if (data.title)
        model.title = data.title
    if (data.image)
        model.image = typeof (data.image) === "string" ?
            data.image.split(',') :
            data.image
    if (data.description)
        model.description = data.description
    if (data.setstatus)
        model.status = true
    if (data.setstatusfalse)
        model.status = false
    if (data.category_id)
        model.category_id = data.category_id
}

function find(data) {
    return new Promise(function (resolve, reject) {
        const result = {}
        companyModel.find({})
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
        companyModel.find(data.condition)
            .sort({
                _id: -1
            })
            .populate('category_id', { title: 1, _id: 1 })
            .limit(data.limit)
            .skip(data.startIndex)
            .exec(function (err, done) {
                if (err) {
                    return reject(err)
                }
                result.result = done
                resolve(result)
            })
    })
}

function post(data) {
    console.log("data is in querry", data)
    return new Promise(function (resolve, reject) {

        const newCompany = new companyModel
        map_company(data, newCompany)

        newCompany.save(function (err, done) {
            if (err) {
                console.log("inside err")
                return reject(err)
            }
            console.log("inside done", done)
            resolve(done)
        })
    })
}

function update(data) {
    return new Promise(function (resolve, reject) {
        companyModel.findById(data.id, function (err, done) {
            if (err) {
                return reject(err)
            }
            if (!done) {
                return reject("category not found")
            }
            map_company(data.data, done)
            if (data.data.newimage) {
                done.image = done.image.concat(data.data.newimage)
            }
            if (data.data.filesToRemove && data.filesToRemove.length) {
                done.images.forEach(function (item, index) {
                    if (data.data.filesToRemove.includes(item)) {
                        done.image.splice(index, 1)
                        removeFileFromServer(item);
                    }
                })
            }


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
        companyModel.findByIdAndRemove(data, function (err, done) {
            if (err) {
                return reject(err)
            }
            if (!done) {
                return reject("company not found")
            }
            if (done.image) {
                removeFileFromServer(done.image)
            }
            resolve(done)
        })
    })
}
function removeFileFromServer(filename) {
    fs.unlink(path.join(process.cwd(), 'uploads/images/' + filename), function (err, removed) {
        if (!err) {
            console.log('file removed from server')
        }
    })
}


module.exports = {
    find,
    post,
    update,
    remove
}
