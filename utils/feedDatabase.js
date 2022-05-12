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

const generateVans = () => {

    let newVans = []
    for (let i = 0; i < 10; i++) {
        const ranBool = random_boolean = Math.random() < 0.5
        const ranPrice = Math.floor(Math.random() * 200)
        const RanLocation = [(Math.floor(Math.random() * 100) - 50), (Math.floor(Math.random() * 100) - 50)]
        const newVan =
        {
            name: `van${i}`,
            description: `This is the van description${i}`,
            dayPrice: ranPrice,
            imageUrl: "https://www.cosasdigitales.com/wp-content/uploads/2016/11/cosas-digitales-articlos-diseno-web.jpg",
            solarPower: ranBool,
            location: {
                type: 'Point',
                coordinates: [RanLocation[0], RanLocation[1]]
            }
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

const generateBookings = (vans) => {
    let bookings = []
    
    for (let i = 0; i < vans.length; i++) {
        const dateRange = randomDateRange()
        const booking =
        {
            dateStart: dateRange[0],
            dateEnd: dateRange[1],
            price: 100,
            van: vans[i]._id
        }
        bookings.push(booking)
    }
    console.log("bookings are...:", bookings)
    return bookings
}

module.exports = { generateBookings, generateUsers, generateVans }