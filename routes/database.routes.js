const router = require("express").Router();
const Van = require("./../models/Van.model")
const Booking = require("./../models/Booking.model");
const User = require("./../models/User.model")

const { generateBookings, generateUsers, generateVans } = require("../utils/feedDatabase");


router.post("/delete-and-generate", (req, res) => {
    console.log("empezamos bien")
    User
        .remove()
        .then(() => Van.remove())
        .then(() => Booking.remove())
        .then(() => User.create(generateUsers()))
        .then(() => Van.create(generateVans()))
        .then((vans) => Booking.create(generateBookings(vans)))
        .then(() => res.status(200).json({ message: "Database regenerated" }))
        .catch(err => res.status(500).json(err))


})

module.exports = router;
