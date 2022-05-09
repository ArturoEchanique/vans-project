const router = require("express").Router()
const Van = require("./../models/Van.model")

router.post('/create-van', (req, res) => {
    const { name, description, imageUrl, longitude, latitude } = req.body
    const newVan = new Van({
        name: name,
        description: description,
        imageUrl: imageUrl,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    });

    Van
        .create(newVan)
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})

router.get('/get-all-vans', (req, res) => {

    Van
        .find()
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})

router.get('/get-oneVan/:van_id', (req, res) => {
    const { van_id } = req.params

    Van
        .findById(van_id)
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})

router.post('/get-oneVan/:van_id/edit', (req, res) => {
    const { van_id } = req.params

    Van
        .findByIdAndUpdate(van_id)
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})

router.post('/get-oneVan/:van_id/delete', (req, res) => {
    const { van_id } = req.params

    Van
        .findById(van_id)
        .then((response => res.json(response)))
        .catch(err => res.status(500).json(err))

})





module.exports = router;
