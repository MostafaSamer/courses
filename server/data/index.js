const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connection
mongoose.connect('mongodb://localhost/courses', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

console.log("Connected!!");

// Schema
const placeSchema = new Schema({
    location: {
        maps: String,
        address: String
    },
    courses: Array,
    name: String,
    rate: {
        value: {type: Number, Default: 0},
        vote: {type: Number, Default: 0},
        lastSum: {type: Number, Default: 0}
    },
    photo: String,
    admin: {
        email: String,
        pass: String
    },
    about: String,
    contact: {
        email: String,
        phone: String
    }
})

const courseSchema = new Schema({
    date: {
        start: Date,
        end: Date,
        repeated: Array
    },
    statue: String,
    price: Number,
    name: String,
    about: String,
    rate: {
        value: {type: Number, Default: 0},
        vote: {type: Number, Default: 0},
        lastSum: {type: Number, Default: 0}
    },
    place_id: String,
    user_ass: Array,
    photo: String
})

const userSchema = new Schema({
    name: String,
    email: String,
    gender: Boolean,
    pass: String,
    favourite: Array,
    course_ass: Array,
    rate_given: Array    // [{id: xxx, rate: 3.5}, {...}, ...]
})

// Model
const placeModel = mongoose.model('place', placeSchema)
const courseModel = mongoose.model('course', courseSchema)
const userModel = mongoose.model('user', userSchema)

///////////////////////////////
///////////////////////////////
// Add Functions
///////////////////////////////
///////////////////////////////

// user
var addUser = function(user, callback) {
    var newUser = new userModel(user);
    newUser.save((err)=> {
        if (!err) {
            callback(true, newUser)
        } else {
            callback(false, null)
        }
    })
}

// place
var addPlace = function(place, callback) {
    var newPlace = new placeModel(place);
    newPlace.save((err)=> {
        if (!err) {
            callback(true, newPlace)
        } else {
            callback(false, null)
        }
    })
}

// course
var addCourse = function(course, callback) {
    var newCourse = new courseModel(course);
    newCourse.save((err)=> {
        if (!err) {
            callback(true, newCourse)
        } else {
            callback(false, null)
        }
    })
}

///////////////////////////////
///////////////////////////////
// delete Functions
///////////////////////////////
///////////////////////////////

// user
var deleteUser = function(id, callback) {
    userModel.deleteOne({_id: id}, (err)=> {
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    })
}

// place
var deletePlace = function(id, callback) {
    placeModel.deleteOne({_id: id}, (err)=> {
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    })
}

// course
var deleteCourse = function(id, callback) {
    courseModel.deleteOne({_id: id}, (err)=> {
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    })
}

///////////////////////////////
///////////////////////////////
// list Functions
///////////////////////////////
///////////////////////////////

// user
var listUser = function(callback) {
    courseModel.find({}, (err, docs)=> {
        if (!err) {
            callback(docs)
        }
    })
    callback(null);
}

// place
var listPlace = function(callback) {
    placeModel.find({}, (err, docs)=> {
        if (!err) {
            callback(docs)
        }
    })
    callback(null);
}

// course
var listCourse = function(callback) {
    courseModel.find({}, (err, docs)=> {
        if (!err) {
            callback(docs)
        }
    })
    callback(null);
}

///////////////////////////////
///////////////////////////////
// update Functions
///////////////////////////////
///////////////////////////////

// user
var updateUser = function(id, user, callback) {
    userModel.updateOne({_id: id}, user).then(()=> {
        callback(true);
    })
}

// place
var updatePlace = function(id, place, callback) {
    placeModel.updateOne({_id: id}, place).then(()=> {
        callback(true);
    })
}

// course
var updateCourse = function(id, course, callback) {
    courseModel.updateOne({_id: id}, course).then(()=> {
        callback(true);
    })
}

///////////////////////////////
///////////////////////////////
// search Functions
///////////////////////////////
///////////////////////////////

// user
var searchUserbyName = function(name, callback) {
    userModel.find({name: name}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}
var searchUserbyEmail = function(email, callback) {
    userModel.find({email: email}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}

// place
var searchPlace = function(name, callback) {
    placeModel.find({name: name}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}

// course
var searchCourse = function(name, callback) {
    courseModel.find({name: name}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}

///////////////////////////////
///////////////////////////////
// search Functions by ID
///////////////////////////////
///////////////////////////////

// user
var searchUserbyId = function(id, callback) {
    userModel.findOne({_id: id}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}

// place
var searchPlacebyId = function(id, callback) {
    placeModel.findOne({_id: id}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}

// course
var searchCoursebyId = function(id, callback) {
    courseModel.findOne({_id: id}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}

///////////////////////////////
///////////////////////////////
// Others Functions
///////////////////////////////
///////////////////////////////
var checkemail = function(email, callback) {
    userModel.findOne({email: email}, (err, docs)=> {
        if (!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}


module.exports = {
    addUser: addUser,
    addPlace: addPlace,
    addCourse: addCourse,
    deleteUser: deleteUser,
    deletePlace: deletePlace,
    deleteCourse: deleteCourse,
    listUser: listUser,
    listPlace: listPlace,
    listCourse: listCourse,
    updateUser: updateUser,
    updatePlace: updatePlace,
    updateCourse: updateCourse,
    searchUserbyName: searchUserbyName,
    searchUserbyEmail: searchUserbyEmail,
    searchPlace: searchPlace,
    searchCourse: searchCourse,
    searchUserbyId: searchUserbyId,
    searchPlacebyId: searchPlacebyId,
    searchCoursebyId: searchCoursebyId,
    checkemail: checkemail
};
