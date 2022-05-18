const router = require("express").Router()
const Booking = require("../models/Booking.model")
const Van = require("./../models/Van.model")
const { isAuthenticated } = require("./../middlewares/jwt.middleware")

router.post("/create", isAuthenticated, (req, res) => {
    const { owner, name, description, imageUrl, dayPrice, longitude, latitude, solarPower, shower, bathroom, maxPassengers } = req.body
    const randomBool = (random_boolean = Math.random() < 0.5)
    const newVan = {
        owner,
        name,
        description,
        dayPrice,
        imageUrl,
        solarPower,
        shower,
        bathroom,
        maxPassengers,
        location: {
            type: "Point",
            coordinates: [longitude, latitude],
        },
    }

    Van.create(newVan)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})

router.get("/", (req, res) => {
    const { name, priceStart, priceEnd, mapXBounds, mapYBounds } = req.query
    let { skip } = req.query
    if (!skip) skip = 0
    let filterParams = { ...req.query }
    const mapXBoundsArr = mapXBounds.split(",").map((str) => Number(str))
    const mapYBoundsArr = mapYBounds.split(",").map((str) => Number(str))
    delete filterParams["name"]
    delete filterParams["startDate"]
    delete filterParams["endDate"]
    let { startDate, endDate } = req.query
    startDate = Number(startDate)
    endDate = Number(endDate)
    let noBookedVans = []
    let filteredVans = []
    let filteredVansIds = []

    Van.find({
        dayPrice: { $gte: priceStart, $lt: priceEnd },
        "location.coordinates.0": { $gte: mapYBoundsArr[0], $lt: mapYBoundsArr[1] },
        "location.coordinates.1": { $gte: mapXBoundsArr[0], $lt: mapXBoundsArr[1] },
        name: { $regex: `${name}`, $options: "i" },
        ...filterParams,
    })
        .sort({ vanRating: -1 })
        .skip(skip)
        .limit(20)
        .then((vans) => {
            noBookedVans = vans
            filteredVansIds = vans.map((van) => van._id)
            return Booking.find({ van: { $in: filteredVansIds } })
        })
        .then((bookings) => {
            bookings.forEach((booking) => {
                if (booking.startDate.getTime() <= endDate && startDate <= booking.endDate.getTime()) {
                    noBookedVans = noBookedVans.filter((van) => van._id.toString() !== booking.bookedVan.toString())
                }
            })
            res.json(noBookedVans)
        })
        .catch((err) => res.status(500).json(err))
})

router.get("/get-vans", (req, res) => {
    const { owner } = req.query

    Van.find({ owner: owner })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err));
});

router.get('/:van_id', (req, res) => {
    const { van_id } = req.params

    Van
        .findById(van_id)
        .populate("reviews")
        .populate({
            path: "reviews",
            populate: {
                path: "owner",
                model: "User",
            },
        })
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})

router.get("/:van_id", (req, res) => {
    const { van_id } = req.params

    Van.findById(van_id)
        .populate("reviews")
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/:van_id/edit", isAuthenticated, (req, res) => {
    const { van_id } = req.params
    const { name, description, imageUrl, dayPrice, longitude, latitude } = req.body
    const newVan = {
        name,
        description,
        dayPrice,
        imageUrl,
        location: {
            type: "Point",
            coordinates: [longitude, latitude],
        },
    }

    Van.findByIdAndUpdate(van_id, newVan)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/:van_id/delete", (req, res) => {
    const { van_id } = req.params

    Van.findByIdAndRemove(van_id)
        .then(() => res.json({ message: "van deleted" }))
        .catch((err) => res.status(500).json(err))
})

router.post('/addreview', (req, res) => {
    const { van_id, review_id } = req.body

    Van
        .findByIdAndUpdate(van_id, { $push: { reviews: review_id } })
        .then(((response) => res.status(200).json(response)))
        .catch(err => res.status(500).json(err))

})

module.exports = router;
