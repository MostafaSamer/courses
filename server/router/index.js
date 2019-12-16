const router = require('express').Router();
const data = require('../data/index');

router.get('/', (req, res)=> {
    res.json("Hello")
})

router.post('/user/login', (req, res)=> {
    var email = req.body.email
    var pass = req.body.pass
    data.checkemail(email, (result)=> {
        if (result) {
            if (result.pass == pass) {
                res.json({
                    error: 0,
                    message: "Login Successfull",
                    data: result
                })
            } else {
                res.json({
                    error: 1,
                    message: "Password is wrong",
                    data: {}
                })
            }
        } else {
            res.json({
                error: 1,
                message: "Email does not exist",
                data: {}
            })
        }
    })
})

router.post('/user/register', (req, res)=> {
    var name = req.body.name
    var email = req.body.email
    var gender = req.body.gender
    var pass = req.body.pass
    data.checkemail(email, (result)=> {
        if (result) {
            res.json({
                error: 1,
                message: "Email is already exist",
                data: {}
            })
        } else {
            var newUser = {
                name: name,
                email: email,
                gender: gender,
                pass: pass,
            }
            data.addUser(newUser, (result, obj)=> {
                if (result) {
                    res.json({
                        error: 0,
                        message: "Add Successfull",
                        data: obj
                    })
                } else {
                    res.json({
                        error: 1,
                        message: "Error Createing Account",
                        data: newUser
                    })
                }
            })
        }
    })
})

router.post('/user/place/search', (req, res)=> {
    var name = req.body.name
    data.searchPlace(name, (result)=> {
        res.json({
            error: 0,
            message: "",
            data: result
        })
    })
})

router.post('/user/place/rate', (req, res)=> {
    var placeId = req.body.placeId
    var userId = req.body.userId
    var rate = req.body.rate
    var edit = req.body.edit
    // Change place data
    data.searchPlacebyId(placeId, (result)=> {
        newSum = result.rate.lastSum + rate
        newRate = newSum/result.rate.vote + 1
        result.rate.lastSum = newSum
        result.rate.value = newRate
        data.updatePlace(placeId, result, (updateResult)=> {
            if (!updateResult) {
                res.json({
                    error: 1,
                    message: "Error Updateing place",
                    data: {}
                })
            } else {
                // Change user data
                data.searchUserbyId(userId, (result)=> {
                    if (edit) {
                        for (var i = 0; i < result.rate_given.length; i++) {
                            if (result.rate_given[i].id == placeId) {
                                result.rate_given[i].rate = rate
                                data.updateUser(userId, result, (updateResult)=> {
                                    if (!updateResult) {
                                        res.json({
                                            error: 1,
                                            message: "Error Updateing place",
                                            data: {}
                                        })
                                    } else {
                                        res.json({
                                            error: 0,
                                            message: "Update Successfull",
                                            data: result
                                        })
                                    }
                                })
                            }
                        }
                    } else {
                        result.rate_given.push({
                            id: placeId,
                            rate: rate
                        })
                        data.updateUser(userId, result, (updateResult)=> {
                            if (!updateResult) {
                                res.json({
                                    error: 1,
                                    message: "Error Updateing place",
                                    data: {}
                                })
                            } else {
                                res.json({
                                    error: 0,
                                    message: "Update Successfull",
                                    data: result
                                })
                            }
                        })
                    }
                })
            }
        })
    })

})

router.post('/user/place/view', (req, res)=> {
    var placeId = req.body.id
    data.searchPlacebyId(placeId, (result)=> {
        res.json({
            error: 0,
            message: "",
            data: result
        })
    })
})

router.post('/user/course/search', (req, res)=> {
    var name = req.body.name
    data.searchCourse(name, (result)=> {
        res.json({
            error: 0,
            message: "",
            data: result
        })
    })
})

router.post('/user/course/rate', (req, res)=> {
    var courseId = req.body.courseId
    var rate = req.body.rate
    data.searchCoursebyId(courseId, (result)=> {
        newSum = result.rate.lastSum + rate
        newRate = newSum/result.rate.vote + 1
        result.rate.lastSum = newSum
        result.rate.value = newRate
        data.updateCourse(courseId, result, (updateResult)=> {
            if (!updateResult) {
                res.json({
                    error: 1,
                    message: "Error Updateing place",
                    data: {}
                })
            } else {
                res.json({
                    error: 0,
                    message: "Update Successfull",
                    data: result
                })
            }
        })
    })
})

router.post('/user/course/assign', (req, res)=> {
    var userId = req.body.userId
    var courseId = req.body.courseId
    data.searchUserbyId(userId, (result)=> {
        result.course_ass.push(courseId)
        data.updateUser(userId, result, (updateResult)=> {
            if (!updateResult) {
                res.json({
                    error: 1,
                    message: "Error Updateing place",
                    data: {}
                })
            } else {
                data.searchCoursebyId(courseId, (result)=> {
                    result.user_ass.push(userId)
                    data.updateCourse(courseId, result, (updateResult)=> {
                        if (!updateResult) {
                            res.json({
                                error: 1,
                                message: "Error Updateing place",
                                data: {}
                            })
                        } else {
                            res.json({
                                error: 0,
                                message: "Update Successfull",
                                data: result
                            })
                        }
                    })
                })
            }
        })
    })
})

router.post('/user/course/view', (req, res)=> {
    var courseId = req.body.id
    data.searchCoursebyId(courseId, (result)=> {
        res.json({
            error: 0,
            message: "",
            data: result
        })
    })
})

router.post('/sysadmin/place/add', (req, res)=> {
    var location_maps = req.body.location_maps
    var location_add = req.body.location_add
    var name = req.body.name
    var about = req.body.about
    var contact_email = req.body.contact_email
    var contact_phone = req.body.contact_phone
    var newPlace = {
        location: {
            maps: location_maps,
            address: location_add
        },
        name: name,
        about: about,
        contact: {
            email: contact_email,
            phone: contact_phone
        }
    }
    data.addPlace(newPlace, (result, obj)=> {
        if (result) {
            res.json({
                error: 0,
                message: "Add Successfull",
                data: obj
            })
        } else {
            res.json({
                error: 1,
                message: "Error Createing Account",
                data: {}
            })
        }
    })
})

router.post('/sysadmin/place/delete', (req, res)=> {
    var placeId = req.body.placeId
    data.deletePlace(placeId, (result)=> {
        if (result) {
            res.json({
                error: 0,
                message: "Deleted",
                data: {}
            })
        } else {
            res.json({
                error: 1,
                message: "Error",
                data: {}
            })
        }
    })
})

router.post('/sysadmin/place/update', (req, res)=> {
    var placeId = req.body.placeId
    var location_maps = req.body.location_maps
    var location_add = req.body.location_add
    var name = req.body.name
    var about = req.body.about
    var contact_email = req.body.contact_email
    var contact_phone = req.body.contact_phone
    var newPlace = {
        location: {
            maps: location_maps,
            address: location_add
        },
        name: name,
        about: about,
        contact: {
            email: contact_email,
            phone: contact_phone
        }
    }
    data.updatePlace(placeId, newPlace, (result)=> {
        if (result) {
            res.json({
                error: 0,
                message: "Update Successfull",
                data: newPlace
            })
        } else {
            res.json({
                error: 1,
                message: "Error Updating Account",
                data: {}
            })
        }
    })
})

router.post('/sysadmin/place/search', (req, res)=> {
    var name = req.body.name
    data.searchPlace(name, (result)=> {
        res.json({
            error: 0,
            message: "",
            data: result
        })
    })
})

router.post('/sysadmin/place/view', (req, res)=> {
    var placeId = req.body.placeId
    data.searchPlacebyId(placeId, (result)=> {
        res.json({
            error: 0,
            message: "",
            data: result
        })
    })
})

router.post('/placeadmin/course/add', (req, res)=> {
    var start_date = req.body.start_date
    var end_date = req.body.end_date
    var days = req.body.days
    var price = req.body.price
    var name = req.body.name
    var about = req.body.about
    var place_id = req.body.place_id
    var newCourse = {
        date: {
            start: start_date,
            end: end_date,
            repeated: days
        },
        price: price,
        name: name,
        about: about,
        place_id: place_id,
    }
    data.addCourse(newCourse, (result, obj)=> {
        if (result) {
            data.searchPlacebyId(place_id, (result)=> {
                result.courses.push(obj._id)
                data.updatePlace(place_id, result, (result)=> {
                    if (result) {
                        res.json({
                            error: 0,
                            message: "Add Successfull",
                            data: obj
                        })
                    }
                })
            })
        } else {
            res.json({
                error: 1,
                message: "Error Createing Account",
                data: {}
            })
        }
    })
})

router.post('/placeadmin/course/update', (req, res)=> {
    var courseId = req.body.courseId
    var start_date = req.body.start_date
    var end_date = req.body.end_date
    var days = req.body.days
    var price = req.body.price
    var name = req.body.name
    var about = req.body.about
    var place_id = req.body.place_id
    var newCourse = {
        date: {
            start: start_date,
            end: end_date,
            repeated: days
        },
        price: price,
        name: name,
        about: about,
        place_id: place_id,
    }
    data.updateCourse(courseId, newCourse, (result)=> {
        if (result) {
            res.json({
                error: 0,
                message: "Add Successfull",
                data: newCourse
            })
        } else {
            res.json({
                error: 1,
                message: "Error Createing Account",
                data: {}
            })
        }
    })
})

router.post('/placeadmin/course/delete', (req, res)=> {
    var courseId = req.body.courseId
    data.deleteCourse(courseId, (result)=> {
        if (result) {
            res.json({
                error: 0,
                message: "Deleted",
                data: {}
            })
        } else {
            res.json({
                error: 1,
                message: "Error",
                data: {}
            })
        }
    })
})

router.post('/placeadmin/course/search', (req, res)=> {
    var name = req.body.name
    data.searchCourse(name, (result)=> {
        res.json({
            error: 0,
            message: "",
            data: result
        })
    })
})

router.post('/placeadmin/course/view', (req, res)=> {
    var courseId = req.body.id
    data.searchCoursebyId(courseId, (result)=> {
        res.json({
            error: 0,
            message: "",
            data: result
        })
    })
})

module.exports = router;
