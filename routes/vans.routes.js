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
    const {name, solarPower, startDate, endDate} = req.query
    let filteredVans = []
    Van
        .find({name: { $regex: `${name}`, $options: "i" }, solarPower: solarPower})
        .then((vans => {
            filteredVansIds = vans.map(van => van._id)
            return Booking.find({ van: { $in : filteredVansIds }})
        }))
        .then(bookings =>{
            bookings.forEach(booking =>{
                console.log(new Date(booking.dateStart.getTime()),
                 new Date(booking.dateEnd.getTime()), 
                    new Date(startDate),  
                    new Date(endDate))
                if (Math.max(booking.dateStart.getTime(), booking.dateEnd.getTime()) <= Math.min(startDate, endDate)) console.log("they overlap!")
                else console.log("they dont overlap!")
                
            })
            res.json(bookings)
        })
        // .then(response => {
        //     res.json(response)
        // })
    
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
