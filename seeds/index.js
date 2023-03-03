const mongoose = require('mongoose');
const Box = require('../models/box');
const Gunner = require('../models/gunner');

const dbUrl = 'mongodb://localhost:27017/warehouse'

mongoose.connect(dbUrl,);

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected");
});

const seedDb = async() => {
    await Box.deleteMany({});
    await Gunner.deleteMany({});

    for (let i = 0; i < 3; i++){
        const lx = Math.floor(Math.random()*20);
        const ly = Math.floor(Math.random()*20);
        const gunner = new Gunner({
            location: {x:lx,y:ly},
            boxes:[],
            capacity:8
        })
        for (let j = 0; j < 3; j++){
            boxi = new Box({
                assembled: j %2 === 0 ? true : false,
                index:j
            })
            gunner.boxes.push(boxi);
            await boxi.save();
        }
        await gunner.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})