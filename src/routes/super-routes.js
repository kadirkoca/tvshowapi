const express = require("express")
const auth = require('../middleware/auth')
const Show = require('../models/show-model')

const router = new express.Router()

/// SUPER ROUTES - Authorized routes

router.post("/addshow", auth, async (req, res) => {
    try {
        const show = new Show(req.body)

        await show.save()
        res.status(200).send('saved')
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.delete("/removeshow/:showid", auth, async (req, res) => {
    try {
        const showid = req.params.showid
        const show = await Show.findOneAndDelete({ _id: showid })
        if (!show) {
            return res.status(404).send("Requested show could not be found")
        }
        res.status(200).send('Show has been removed successfully')
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.post('/addtofavorits', auth, async (req, res) => {
    try {
        const showid = req.body.showid
        if (showid === undefined) {
            return res.status(400).send("Invalid show id")
        }

        await Show.findByIdAndUpdate(
            showid,
            { $push: { users: req.user._id } },
            { new: true, useFindAndModify: false }
        ).then((show) => {
            res.status(201).send(show)
        }).catch((error) => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.post('/removefavorite', auth, async (req, res) => {
    try {
        const showid = req.body.showid
        if (showid === undefined) {
            return res.status(400).send("Invalid show id")
        }

        await Show.findByIdAndUpdate(
            showid,
            { $pull: { users: req.user._id } },
            { new: true, useFindAndModify: false }
        ).then(() => {
            res.status(201).send('Favorite has been removed')
        }).catch((error) => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.get("/favorites", auth, async (req, res) => {
    try {
        const qparams = req.query
        let sort = {}

        // SORTING FAVORITES
        if (qparams.sort !== undefined && qparams.sort.split(':').length > 1) {
            const sortfield = qparams.sort.split(":")
            sort[sortfield[0]] = sortfield[1]
        }


        // PAGINATION FAVORITES
        let pagesize = parseInt(qparams.pagesize)
        const pageno = parseInt(qparams.pageno ? qparams.pageno : 1)
        const defaultsize = parseInt(process.env.DEFAULT_PAGESIZE_FAVORITES)

        if (!pagesize || pagesize > defaultsize) {
            pagesize = defaultsize // default page size
        }


        const user = await req.user.populate({
            path: 'favorites',
            options: {
                limit: pagesize,
                skip: (pageno - 1) * pagesize,
                sort
            }
        })
        const favorite_shows = user.favorites

        res.send({
            pageno,
            pagesize,
            count: favorite_shows.length, 
            favorite_shows 
        })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})


router.get("/getshows", auth, async (req, res) => {
    try {
        const qparams = req.query
        let query = Show.find()

        // FILTERING
        if (qparams.year !== undefined) { // filter by release
            query = query.where("year").equals(qparams.year)
        }

        if (qparams.genre !== undefined) { // filter by genre
            query = query.where("genre").equals(qparams.genre)
        }

        if (qparams.actor !== undefined) { // filter by actor
            query = query.where("crew").in(qparams.actor.split(','))
        }

        // SORTING
        if (qparams.sort !== undefined && qparams.sort.split(':').length > 1) { // sort            
            const sort = {}
            const sortfield = qparams.sort.split(":")
            sort[sortfield[0]] = sortfield[1]
            query = query.sort(sort)
        }


        // PAGINATION
        let pagesize = parseInt(qparams.pagesize)
        const pageno = parseInt(qparams.pageno ? qparams.pageno : 1)
        const defaultsize = parseInt(process.env.DEFAULT_PAGESIZE_SHOWS)

        if (!pagesize || pagesize > defaultsize) {
            pagesize = defaultsize // default page size
        }

        if (pageno) { // pagination limit & skip
            query = query.skip((pageno - 1) * pagesize).limit(pagesize)
        }

        const shows = await query.exec()
        res.send({
            pageno,
            pagesize,
            count: shows.length, 
            shows
        })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.get("/recommends", auth, async (req, res) => {
    try {
        const qparams = req.query
        const user = await req.user.populate('favorites')
        const favorites = user.favorites
        
        const favoriteGenres = []
        let favoriteActors = []

        for(const { genre, crew } of favorites){
            favoriteGenres.push(genre)
            favoriteActors = favoriteActors.concat(crew)
        }
        
        let recommendationsQuery = Show.find({ $or: [{ "genre": { "$in": favoriteGenres }}, { "crew": { "$in": favoriteActors }}] })
        
        // FILTERING RECOMMENDATIONS
        if (qparams.year !== undefined) { // filter by release
            recommendationsQuery = recommendationsQuery.where("year").equals(qparams.year)
        }

        if (qparams.genre !== undefined) { // filter by genre
            recommendationsQuery = recommendationsQuery.where("genre").equals(qparams.genre)
        }

        if (qparams.actor !== undefined) { // filter by actor
            recommendationsQuery = recommendationsQuery.where("crew").in(qparams.actor.split(','))
        }

        // SORTING RECOMMENDATIONS
        if (qparams.sort !== undefined && qparams.sort.split(':').length > 1) { // sort            
            const sort = {}
            const sortfield = qparams.sort.split(":")
            sort[sortfield[0]] = sortfield[1]
            recommendationsQuery = recommendationsQuery.sort(sort)
        }


        // PAGINATION RECOMMENDATIONS
        let pagesize = parseInt(qparams.pagesize)
        const pageno = parseInt(qparams.pageno ? qparams.pageno : 1)
        const defaultsize = parseInt(process.env.DEFAULT_PAGESIZE_SHOWS)

        if (!pagesize || pagesize > defaultsize) {
            pagesize = defaultsize // default page size
        }

        if (pageno) { // pagination limit & skip
            recommendationsQuery = recommendationsQuery.skip((pageno - 1) * pagesize).limit(pagesize)
        }

        const reccomended_shows = await recommendationsQuery.exec()
        res.send({
            pageno,
            pagesize,
            count: reccomended_shows.length,
            reccomended_shows
        })
        
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

module.exports = router