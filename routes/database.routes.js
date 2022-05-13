const router = require("express").Router();
const Van = require("./../models/Van.model")
const Review = require("./../models/Review.model")
const Booking = require("./../models/Booking.model");
const User = require("./../models/User.model")

const { generateBookings, generateUsers, generateVans, generateReviews } = require("../utils/feedDatabase");

router.post("/delete-and-generate", (req, res) => {
    let usersArr = []
    let reviewsArr = []
    let reviewsIds = []
    let vansIds = []
    let usersIds = []
    User
        .remove()
        .then(() => Van.remove())
        .then(() => Booking.remove())
        .then(() => Review.remove())
        .then(() => {
            return User.create(generateUsers())
        })
        .then((users) => {
            usersArr = users
            usersIds = usersArr.map(user => user._id)
            return Review.create(generateReviews(usersIds, 20))
        })
        .then((reviews) => {
            reviewsArr = reviews
            console.log(reviewsArr)
            reviewsIds = reviewsArr.map(review => review._id)
            return Van.create(generateVans(usersIds, reviewsIds, 20))
        })
        .then((vans) => {
            vansIds = vans.map(van => van._id)
            Booking.create(generateBookings(vansIds, 20))
        })
        .then(() => res.status(200).json({ message: "Database regenerated" }))
        .catch(err => res.status(500).json(err))


})

module.exports = router;
