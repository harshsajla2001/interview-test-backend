const mongoose = require('mongoose');

const teamLeaderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamMember'
    }]
    
}, { timestamps: true});

module.exports = mongoose.model('TeamLeader', teamLeaderSchema);