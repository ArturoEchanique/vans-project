const router = require("express").Router()
const Chat = require("../models/Chat.model")
const { isAuthenticated } = require('../middlewares/jwt.middleware')


router.get("/get-all", (req, res) => {

    Chat
        .find()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/get-user-chats/:user_id", (req, res) => {

    const { user_id } = req.params
    Chat
        .find({ owners: user_id })
        .populate("owners booking")
        .populate({
            path: "booking",
            populate: {
                path: "bookedVan",
                model: "Van",
                populate: {
                    path: "owner",
                    model: "User"
                }
            },
        })

        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/create-chat", (req, res) => {

    const newChat = { owners, booking  } = req.body

    Chat
        .create(newChat)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/:chat_id/", (req, res) => {

    const { chat_id } = req.params

    Chat
        .findById(chat_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/edit/:chat_id", isAuthenticated, (req, res) => {

    const { chat_id } = req.params;
    const chatData = { rating, text } = req.body

    Chat
        .findByIdAndUpdate(chat_id, chatData)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
});

router.post("/delete/:chat_id", isAuthenticated, (req, res) => {

    const { chat_id } = req.params;
    Chat
        .findByIdAndDelete(chat_id)
        .then((response) => res.json(response))
        .catch((err) => res.status(500).json(err));
});

router.get("/:chat_id", isAuthenticated, (req, res) => {

    const { chat_id } = req.params

    Chat
        .findById(chat_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router