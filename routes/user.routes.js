const router = require("express").Router()
const User = require("../models/User.model")
const { isAuthenticated } = require("./../middlewares/jwt.middleware")

router.get("/get-all", (req, res) => {
    User.find()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/edit/:user_id", isAuthenticated, (req, res) => {
    const { user_id } = req.params
    const { email, password, username, imageUrl, role } = req.body

    User.findByIdAndUpdate(user_id, { email, password, username, imageUrl, role })
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/delete/:user_id", isAuthenticated, (req, res) => {
    const { user_id } = req.params
    User.findByIdAndDelete(user_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
})

router.get("/:user_id", isAuthenticated, (req, res) => {
    const { user_id } = req.params

    User.findById(user_id)
        .populate("userBookings ownerBookings favoriteVans")

        .populate({
            path: "userBookings",
            populate: {
                path: "bookedVan",
                model: "Van",
            },
        })
        .populate({
            path: "ownerBookings",
            populate: {
                path: "bookedVan",
                model: "Van",
            },
        })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/:user_id/add-favorite-van", (req, res) => {
    const { user_id } = req.params
    const { vanId } = req.body

    User.findByIdAndUpdate(user_id, { $push: { favoriteVans: vanId } })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/:user_id/remove-favorite-van", (req, res) => {
    const { user_id } = req.params
    const { vanId } = req.body

    User.findByIdAndUpdate(user_id, { $pull: { favoriteVans: vanId } })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

module.exports = router
