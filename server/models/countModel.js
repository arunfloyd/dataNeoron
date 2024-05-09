const mongoose = require("mongoose");

// Model for CountAPI

const countSchema = new mongoose.Schema(
    {
        taskCount: {
            type: Number,
            default: 0,
            required: true,
        },
        updateCount: {
            type: Number,
            default: 0,
            required: true,
        },
        deleteCount: {
            type: Number,
            default: 0,
            required: true,
        },
        totalCount: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Count = mongoose.model('count', countSchema);

module.exports = Count;