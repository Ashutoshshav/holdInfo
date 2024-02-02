const express = require('express');
const mongoose = require('mongoose');
const Info = require("./models/info");
const axios = require('axios');
const ejs = require('ejs');

const app = express();
app.set("view engine", "ejs");
const port = 3000;

try { 
        mongoose.connect('mongodb://127.0.0.1:27017/Hodlinfo');
        console.log("database connected");
} catch(e) {
        console.log("Error : ", e);
}

async function fetchDataAndStore() {
        try {
                const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
                const datas = Object.values(response.data).slice(0, 10);

                await Info.deleteMany({});
                datas.map(async (data) => {
                        const info = new Info({
                                name : data.name,
                                last : data.last,
                                buy: data.buy,
                                sell: data.sell,
                                volume: data.volume,
                                base_unit: data.base_unit,
                        });

                        await info.save();
                })

                console.log("data saved");
        } catch(e) {
                console.log('Error : ', e);
        }
}

fetchDataAndStore();

app.get("/data", async (req, res) => {
        try {
                const dataFromDB = await Info.find({}).limit(10);
                res.render("info", {dataFromDB})
        } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
        }
});

app.listen(port, () => {
        console.log(`Listen on ${port}`);
});
