const mongoose = require('mongoose');
const Box = require('../models/box');
const Shed = require('../models/shed');

const dbUrl = 'mongodb://localhost:27017/warehouse'

mongoose.connect(dbUrl,);

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected");
});

const seedDb = async() => {
    await Box.deleteMany({});
    await Shed.deleteMany({});

    for (let i = 0; i < 3; i++){
        const lx = Math.random()*20;
        const ly = Math.random()*20;
        const height = 6.0;
        const rowNumber = 2;
        const shed = new Shed({
            location: {x:lx,y:ly},
            boxes:[],
            height,
            rowNumber,
            capacity:8
        })
        for (let j = 0; j < 3; j++){
            boxi = new Box({
                assembled: j %2 === 0 ? true : false,
                index:j,
                productNumber:Math.random().toString(36).slice(-8)
            })
            shed.boxes.push(boxi);
            boxi.shed = shed
            await boxi.save();
        }
        await shed.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})