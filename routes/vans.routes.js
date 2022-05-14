const router = require("express").Router()
const Booking = require("../models/Booking.model");
const Van = require("./../models/Van.model")
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

router.post('/create', isAuthenticated, (req, res) => {
    const { name, description, imageUrl, dayPrice, longitude, latitude } = req.body
    const randomBool = random_boolean = Math.random() < 0.5
    const newVan = {
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
    const { name } = req.query
    let filterParams = { ...req.query }
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
        .find({ name: { $regex: `${name}`, $options: "i" }, ...filterParams })
        .then((vans => {
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
