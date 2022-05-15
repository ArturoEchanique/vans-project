const router = require("express").Router()
const Booking = require("../models/Booking.model");
const Van = require("./../models/Van.model")
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

router.post('/create', isAuthenticated, (req, res) => {
    const { owner, name, description, imageUrl, dayPrice, longitude, latitude } = req.body
    const randomBool = random_boolean = Math.random() < 0.5
    const newVan = {
        owner,
        name,
        description,
        dayPrice,
        imageUrl,
        solarPower: randomBool,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    }

    Van
        .create(newVan)
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})

router.get('/', (req, res) => {
    const { name, priceStart, priceEnd, mapXBounds, mapYBounds } = req.query
    let filterParams = { ...req.query }
    const mapXBoundsArr = mapXBounds.split(",").map(str => Number(str))
    const mapYBoundsArr = mapYBounds.split(",").map(str => Number(str))
    console.log("mapxboundsarr is --------------",mapXBoundsArr)
    delete filterParams["name"]
    delete filterParams["startDate"]
    delete filterParams["endDate"]
    // console.log("filterParams is", filterParams)
    // console.log("query is", req.query)
    let { startDate, endDate } = req.query
    startDate = Number(startDate)
    endDate = Number(endDate)
    let noBookedVans = []
    let filteredVans = []
    let filteredVansIds = []

    Van
        .find({ dayPrice: { $gte: priceStart, $lt: priceEnd }, 
            "location.coordinates.0": { $gte: mapYBoundsArr[0], $lt: mapYBoundsArr[1] }, 
            "location.coordinates.1": { $gte: mapXBoundsArr[0], $lt: mapXBoundsArr[1] },
            name: { $regex: `${name}`, $options: "i" }, ...filterParams})
        .sort({ 'vanRating': -1 })
        .limit(25)
        .then((vans => {
            console.log("se han traido estas vans------", vans.length)
            noBookedVans = vans
            filteredVansIds = vans.map(van => van._id)
            return Booking.find({ van: { $in: filteredVansIds } })
        }))
        .then(bookings => {
            bookings.forEach(booking => {
                // console.log("bsd", booking.startDate.getTime(), "bed", booking.endDate.getTime(),
                // "qsd", startDate, "qed", endDate)
                if ((booking.startDate.getTime() <= endDate) && (startDate <= booking.endDate.getTime())) {
                    // console.log("yes they overlap!")
                    console.log("this is booking", booking, "this is booking van", booking.bookedVan)
                    noBookedVans = noBookedVans.filter(van => van._id.toString() !== booking.bookedVan.toString())

                }
                else {
                    // console.log("NO dont overlap!")
                }
            })
            res.json(noBookedVans)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/:van_id', (req, res) => {
    const { van_id } = req.params

    Van
        .findById(van_id)
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})

router.post('/:van_id/edit', isAuthenticated, (req, res) => {
    const { van_id } = req.params
    const { name, description, imageUrl, dayPrice, longitude, latitude } = req.body
    const newVan = {
        name,
        description,
        dayPrice,
        imageUrl,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    }

    Van
        .findByIdAndUpdate(van_id, newVan)
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})

router.post('/:van_id/delete', (req, res) => {
    const { van_id } = req.params

    Van
        .findByIdAndRemove(van_id)
        .then((() => res.json({ message: "van deleted" })))
        .catch(err => res.status(500).json(err))

})

module.exports = router;
