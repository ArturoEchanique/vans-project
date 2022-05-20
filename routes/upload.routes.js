const router = require("express").Router()

const { response } = require("express")
const uploader = require("./../config/cloudinary.config")

router.post("/image", uploader.single("imageData"), (req, res) => {
    if (!req.file) {
        res.status(500).json({ errorMessage: "Error uploading to claudinary" })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})

router.post("/multipleImages", uploader.array("photos"), (req, res) => {
    let response = req.file || req.files

    if (!response) {
        res.status(500).json({ errorMessage: "Error uploading to claudinary" })
        return
    }

    res.json({ cloudinary_urls: response.map((res) => res.path) })
})

router.get("/multipleImages", (req, res) => {
    uploader
        .resources({ type: 'upload', max_results: 30 })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})


module.exports = router
