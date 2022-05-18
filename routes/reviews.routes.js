const router = require("express").Router()
const Review = require("../models/Review.model")
const { isAuthenticated } = require("./../middlewares/jwt.middleware")

router.get("/get-all", (req, res) => {
    Review.find()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/create", (req, res) => {

    const newReview = { owner, rating, reviewDate, text } = req.body

    Review
        .create(newReview)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/edit/:review_id", isAuthenticated, (req, res) => {
    const { review_id } = req.params
    const reviewData = ({ rating, text } = req.body)

    Review.findByIdAndUpdate(review_id, reviewData)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/delete/:review_id", isAuthenticated, (req, res) => {
    const { review_id } = req.params
    Review.findByIdAndDelete(review_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})

router.get("/:review_id", isAuthenticated, (req, res) => {
    const { review_id } = req.params

    Review.findById(review_id)
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

module.exports = router
