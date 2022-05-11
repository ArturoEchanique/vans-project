const router = require("express").Router()
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
    console.log("req.query is", req.query)
    const { name, solarPower } = req.query
    console.log(req.query)
    Van
        // { name: "nameQuery" }
        // .find({ solarPower: "true", name: { $regex: "1", $options: "i" } })
        .find({ name: { $regex: `${name}`, $options: "i" }, solarPower: solarPower })
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))
})

// router.get('/query', (req, res) => {

//     console.log(req.query)
//     Van
//         .find(req.query)
//         .then((response => res.json(response)))
//         .catch(err => res.status(500).json(err))
// })

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
