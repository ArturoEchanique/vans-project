const router = require("express").Router();
const Booking = require("../models/Booking.model");
const User = require("../models/User.model")

router.post("/create", (req, res) => {

    const { owner_id, user_id } = req.query
    const { startDate, endDate, price, bookedVan } = req.body
    let bookingId = ""
    let newBooking = {}


    Booking
        .create({ startDate, endDate, price, bookedVan })
        .then((booking) => {
            newBooking = booking
            bookingId = booking._id
            return User.findByIdAndUpdate(user_id, { $push: { userBookings: bookingId } })
        })
        .then(() => User.findByIdAndUpdate(owner_id, { $push: { ownerBookings: bookingId } },))
        .then(() => res.json(newBooking))
        .catch((err) => res.status(500).json(err))
});

router.get("/get-all", (req, res) => {

    Booking
        .find()
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
});

router.get("/get-van-bookings/:van_id", (req, res) => {

    const { van_id} = req.params
    Booking
        .find({bookedVan: van_id})
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
});

router.get("/:booking_id", (req, res) => {
    const { booking_id } = req.params

    Booking
        .findById(booking_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
});

router.post("/edit/:bookings_id", (req, res) => {
    const { id } = req.params
    const { startDate, endDate, price, van } = req.body

    Booking
        .findByIdAndUpdate(id, { startDate, endDate, price, van })
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
});

router.post("/delete/:booking_id", (req, res) => {
    const { booking_id } = req.params

    Booking
        .findByIdAndDelete(booking_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err))
});
module.exports = router;
