const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    savedCareers: [{
        title: String,
        description: String,
        matchPercentage: Number,
        dateSaved: {
            type: Date,
            default: Date.now
        }
    }],
    studentInfo: {
        currentClass: String,
        interest: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
