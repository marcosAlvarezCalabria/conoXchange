const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petitionSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name of the skill is required"],
            maxLength: [50, "Name should have less than 50 characters"]
        },
        category: {
            type: String,
            required: [false, "Category is required"],
            enum: ['crafts', 'cooking', 'gardening and horticulture', 'everyday life skills', 'music', 'sports', 'technology', 'languages and culture','others'],
        
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        requester: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: false
        }
    },

    { timestamps: true }
)
const Petition = mongoose.model("petition",petitionSchema);
module.exports = Petition