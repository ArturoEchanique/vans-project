vanImages = require(".././data/images")
vanNames = require(".././data/vanNames")
vanDescriptions = require(".././data/vanDescriptions")
vanReviews = require(".././data/vanReviews")

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function randomDateRange() {
    const randomDateOffset = Math.floor(Math.random() * 20)
    const randomDateOffset2 = Math.floor(Math.random() * 10)
    let dateRange = []
    let startDate = new Date()
    startDate.setDate(startDate.getDate() + randomDateOffset)
    dateRange.push(startDate)

    let endDate = new Date()
    endDate.setDate(endDate.getDate() + randomDateOffset + randomDateOffset2)
    dateRange.push(endDate)
    return dateRange
}

const generateReviews = (usersIds, count) => {

    let newReviews = []
    for (let i = 0; i < count; i++) {
        const ranReview = vanReviews[Math.floor(Math.random() * vanReviews.length)]
        const owner = usersIds[Math.floor(Math.random() * usersIds.length)]
        const newReview = {
            owner: owner,
            reviewDate: randomDate(new Date(2022, 5, 1), new Date()),
            text: ranReview,
        }
        newReviews.push(newReview)
    }
    return newReviews
}

const generateMessages = (chats, count) => {
    let newMessages = []
    chats.forEach((chat) => {
        for (let j = 0; j < count; j++) {
            const randomInt = Math.floor(Math.random() * 2)
            const owner = chat.owners[randomInt]
            const receiver = chat.owners[(randomInt + 1) % 2]
            const text = `This is a message from ${owner.username} to ${receiver.username},message number ${j} in this chat`
            const newMessage = {
                owner: owner,
                chat: chat,
                messageDate: randomDate(new Date(2022, 5, 1), new Date()),
                text: text,
            }
            newMessages.push(newMessage)
        }
    })

    return newMessages
}

const generateVans = (usersIds, reviewsIds, count) => {
    let newVans = []
    for (let i = 0; i < count; i++) {
        const owner = usersIds[Math.floor(Math.random() * usersIds.length)]
        const reviewsIdsArr = reviewsIds.slice(Math.floor(Math.random() * reviewsIds.length), reviewsIds.length - 1)
        const ranBool = () => (random_boolean = Math.random() < 0.5)
        const ranPassengers = Math.floor(Math.random() * 9) + 4
        const ranPrice = Math.floor(Math.random() * 400)
        const ranRating = Math.round(Math.random() * 5 * 100) / 100
        const ranLocation = [Math.random() * 8 + 36, Math.random() * 8 - 8]
        const ranUrl = vanImages[Math.floor(Math.random() * vanImages.length)]
        const ranName = vanNames[Math.floor(Math.random() * vanNames.length)]
        const ranDescription = vanDescriptions[Math.floor(Math.random() * vanDescriptions.length)]
        console.log("ran url is", ranUrl)
        const newVan = {
            owner: owner,
            name: ranName,
            description: ranDescription,
            dayPrice: ranPrice,
            imageUrl: ranUrl,
            solarPower: ranBool,
            location: {
                type: "Point",
                coordinates: [ranLocation[0], ranLocation[1]],
            },
            solarPower: ranBool(),
            shower: ranBool(),
            bathroom: ranBool(),
            kitchen: ranBool(),
            sunRoof: ranBool(),
            heatedSeats: ranBool(),
            maxPassengers: ranPassengers,
            vanRating: ranRating,
            reviews: reviewsIdsArr,
        }
        newVans.push(newVan)
    }
    return newVans
}

const generateUsers = (currentUsersCount, newUsersCount) => {
    let newUsers = []
    for (let i = 0; i < newUsersCount; i++) {
        const imageSrc = `../../images/profileImages/${1 + (i % 18)}.jpeg`
    
        const newUser = {
            username: `user${currentUsersCount + i}`,
            email: `user${currentUsersCount + i * 1000 + 100}@gmail.com`,
            password: `user${currentUsersCount + i}`,
            imageUrl: imageSrc,
        }
        newUsers.push(newUser)
    }
    return newUsers
}

const generateBookings = (vansIds, count) => {
    let bookings = []

    for (let i = 0; i < count; i++) {
        const vanId = vansIds[Math.floor(Math.random() * vansIds.length)]
        const dateRange = randomDateRange()
        const booking = {
            startDate: dateRange[0],
            endDate: dateRange[1],
            price: 100,
            bookedVan: vanId,
        }
        bookings.push(booking)
    }
    return bookings
}

module.exports = { generateBookings, generateUsers, generateVans, generateReviews, generateMessages }
