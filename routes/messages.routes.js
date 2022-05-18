const router = require("express").Router()
const Message = require("../models/Message.model")
const { isAuthenticated } = require("./../middlewares/jwt.middleware")

router.get("/get-all", (req, res) => {
    Message.find()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

router.get("/get-user-messages/:user_id", (req, res) => {
    const { user_id } = req.params

    Message.find({ owner: user_id })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

router.post("/create-message", (req, res) => {
    const newMessage = ({ chat, owner, text, messageDate } = req.body)

    Message.create(newMessage)
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

router.get("/get-chat-messages/:chat_id", (req, res) => {
    const { chat_id } = req.params

    Message.find({ chat: chat_id })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})

// router.get("/:message_id/", (req, res) => {

//     const {message_id} = req.params

//     Message
//         .findById(message_id)
//         .then(response => res.status(200).json(response))
//         .catch(err => res.status(500).json(err))
// })

// router.post("/edit/:message_id", isAuthenticated, (req, res) => {

//     const { message_id } = req.params;
//     const messageData = { rating, text } = req.body

//     Message
//         .findByIdAndUpdate(message_id, messageData)
//         .then((response) => res.json(response))
//         .catch((err) => res.status(500).json(err));
// });

// router.post("/delete/:message_id", isAuthenticated, (req, res) => {

//     const { message_id } = req.params;
//     Message
//         .findByIdAndDelete(message_id)
//         .then((response) => res.json(response))
//         .catch((err) => res.status(500).json(err));
// });

// router.get("/:message_id", isAuthenticated, (req, res) => {

//     const { message_id } = req.params

//     Message
//         .findById(message_id)
//         .then(response => res.status(200).json(response))
//         .catch(err => res.status(500).json(err))
// })

module.exports = router
