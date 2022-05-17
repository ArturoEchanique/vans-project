const router = require("express").Router();
const Van = require("./../models/Van.model")
const Review = require("./../models/Review.model")
const Booking = require("./../models/Booking.model");
const User = require("./../models/User.model")
const Message = require("./../models/Message.model")
const Chat = require("./../models/Chat.model")

const { generateBookings, generateUsers, generateVans, generateReviews, generateMessages } = require("../utils/feedDatabase");

router.post("/delete-and-generate", (req, res) => {
    let usersArr = []
    let reviewsArr = []
    let reviewsIds = []
    let bookingsArr = []
    let bookingsIds = []
    let vansIds = []
    let usersIds = []
    let currentUsersCount = 0
    let userOwnerBookingPromises = []
    let userUserBookingPromises = []
    let chatPromises = []
    User
        .count()
        .then((count) => {
            currentUsersCount = count
            Van.remove()
        })
        .then(() => Van.remove())
        .then(() => Booking.remove())
        .then(() => Chat.remove())
        .then(() => Review.remove())
        .then(() => Message.remove())
        .then(() => {
            return User.create(generateUsers(currentUsersCount, 2))
        })
        .then(() => {
            return User.find()
        })
        .then((users) => {
            usersArr = users
            usersIds = usersArr.map(user => user._id)
            return Review.create(generateReviews(usersIds, 50))
        })
        .then((reviews) => {
            reviewsArr = reviews
            reviewsIds = reviewsArr.map(review => review._id)
            return Van.create(generateVans(usersIds, reviewsIds, 1000))
        })
        .then((vans) => {
            vansIds = vans.map(van => van._id)
            return Booking.create(generateBookings(vansIds, 10))
        })
        .then(() => {
            return Booking.find().populate("bookedVan")
        })
        .then((bookings) => {
            bookingsArr = bookings
            bookingsIds = bookingsArr.map(booking => booking._id)
            bookings.forEach(booking => {
                userOwnerBookingPromises.push(User.findByIdAndUpdate(booking.bookedVan.owner, { $push: { ownerBookings: booking._id } }))
                let bookingReserver = booking.bookedVan.owner
                
                while (bookingReserver.toString() === booking.bookedVan.owner.toString()) bookingReserver = usersIds[Math.floor(Math.random() * usersIds.length)]
                console.log("los ids son...", bookingReserver, booking.bookedVan.owner)
                userUserBookingPromises.push(User.findByIdAndUpdate(bookingReserver, { $push: { userBookings: booking._id } }))
                chatPromises.push(Chat.create({ owners: [booking.bookedVan.owner, bookingReserver], booking: booking._id }))
            })
            return Promise.all(userOwnerBookingPromises)
        })
        .then(() => {
            return Promise.all(userUserBookingPromises)
        })
        .then(() => {
            return Promise.all(chatPromises)
        })
        .then(() => {
            return Chat.find().populate("owners")
        })
        .then((chats) => {
            return Message.create(generateMessages(chats, 5))
        })
        

        .then((response) => {
            res.status(200).json({ message: "Database regenerated" })
        })
        .catch(err => res.status(500).json(err))


})

module.exports = router;
