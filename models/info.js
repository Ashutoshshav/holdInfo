const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
        name : {
                type : String
        },

        last : {
                type : Number
        },

        buy : {
                type : Number
        },

        sell : {
                type : Number
        },

        volume : {
                type : Number
        },

        base_unit : {
                type : String
        }
});

const Info = mongoose.model("Info", infoSchema);

module.exports = Info;