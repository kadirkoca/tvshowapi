const mongoose = require("mongoose")

const showSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    fullTitle: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        index: true
    },
    genre: {
        type: String,
        required: true,
        index: true
    },
    image: {
        type: String,
        required: true,
    },
    crew: {
        type: [String],
        required: true,
        set: v => v.split(',').map((el)=>el.trim()),
        index:true
    },
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ],
    imdb: {
        type: Number,
        required: true,
    }
})

showSchema.methods.toJSON = function () {
    const show = this
    const showObject = show.toObject()
    showObject.showid = showObject._id
    delete showObject.users
    delete showObject.__v
    delete showObject._id

    return showObject
}


const Show = mongoose.model("Show", showSchema)

module.exports = Show
