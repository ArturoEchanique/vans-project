function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomDateRange() {
    const randomDateOffset = Math.floor(Math.random() * 20)
    const randomDateOffset2 = Math.floor(Math.random() * 10)
    let dateRange = []
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + randomDateOffset);
    dateRange.push(startDate)

    let endDate = new Date();
    endDate.setDate(endDate.getDate() + randomDateOffset + randomDateOffset2);
    dateRange.push(endDate)
    return dateRange;
}

const generateReviews = (usersIds, count) => {

    const text = "The location is outstanding. We walked into the village to get coffee through two wooded paths, and the Raven Pub was just up the street offering a warm and welcoming environment and great pub fare. The view over the water was fantastic. The whole unit was very clean and tidy when we arrived and everything was available and handy. "

    let newReviews = []
    for (let i = 0; i < count; i++) {
        const owner = usersIds[Math.floor(Math.random() * usersIds.length)]
        const newReview =
        {
            owner: owner,
            reviewDate: randomDate(new Date(2022, 5, 1), new Date()),
            text: text,
        }
        newReviews.push(newReview)
    }
    return newReviews
}

const generateVans = (usersIds, reviewsIds, count) => {

    let newVans = []
    for (let i = 0; i < count; i++) {
        const owner = usersIds[Math.floor(Math.random() * usersIds.length)]
        const reviewsIdsArr = reviewsIds.slice(Math.floor(Math.random() * reviewsIds.length), reviewsIds.length - 1)
        const ranBool = () => random_boolean = Math.random() < 0.5
        const ranPassengers = Math.floor(Math.random() * 10)
        const ranPrice = Math.floor(Math.random() * 200)
        const RanLocation = [(Math.floor(Math.random() * 100) - 50), (Math.floor(Math.random() * 100) - 50)]
        const newVan =
        {
            owner: owner,
            name: `van${i}`,
            description: `This is the van description${i}`,
            dayPrice: ranPrice,
            imageUrl: "https://www.cosasdigitales.com/wp-content/uploads/2016/11/cosas-digitales-articlos-diseno-web.jpg",
            solarPower: ranBool,
            location: {
                type: 'Point',
                coordinates: [RanLocation[0], RanLocation[1]]
            },
            solarPower: ranBool(),
            shower: ranBool(),
            bathroom: ranBool(),
            maxPassengers: ranPassengers,

            reviews: reviewsIdsArr,
        }
        newVans.push(newVan)
    }
    return newVans
}

const generateUsers = () => {

    let newUsers = []
    for (let i = 0; i < 10; i++) {
        const newUser =
        {
            username: `user${i}`,
            email: `user${i}@gmail.com`,
            password: `user${i}`,
            imageUrl: "https://i.stack.imgur.com/34AD2.jpg"
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
        const booking =
        {
            startDate: dateRange[0],
            endDate: dateRange[1],
            price: 100,
            van: vanId
        }
        bookings.push(booking)
    }
    return bookings
}

module.exports = { generateBookings, generateUsers, generateVans, generateReviews }