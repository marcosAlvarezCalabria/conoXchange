const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema(
    {
     name: {
        type: String,
        required : [true, "Name of the skill is required"],
        maxLength : [50, "Name required lest than 50 characters"]

     },
     category: {
        type: String,
        required : [true, "Category is required"],
        enum : ["Crafts", "Cocking", "Gardening and Horticulture", "Everyday Life Skills","Music", "Sports", "Technology", "Languages and Culture", "Others"]
     },
     description: {
        type: String,
        required :  [true, "Descriptions is required"],

    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "Expert",
        required: true

    }
)
