const mongoose = require('./mongoose')
const Show = require('../models/show-model')
const exampleShows = require('./exampleShows')
const fs = require('fs')

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"]

const seedShows = async () => {
    exampleShows.map((film)=>{
        film.genre = genres[random(0, 9)]
        return film
    })
    
    const dataJSON = JSON.stringify(exampleShows)
    fs.writeFileSync('notes.json', dataJSON)

    await Show.deleteMany({})
    await Show.insertMany(exampleShows)
}

seedShows().then(()=>{
    mongoose.connection.close()
})