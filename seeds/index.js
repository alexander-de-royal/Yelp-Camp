const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelper')
const Campground = require('../models/campground')

main().catch(err=>console.log(err))

async function main() {

    await mongoose.connect("mongodb://localhost:27017/yelp-camp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

const db = mongoose.connection;

db.on("error", console.error.bind(console,"connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '6543195c530e58412da01386',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Something goes here',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});